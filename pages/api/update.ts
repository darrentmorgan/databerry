import { DatasourceStatus, DatastoreVisibility } from '@prisma/client';
import { NextApiResponse } from 'next';

import { UpdateRequestSchema } from '@app/types/dtos';
import { UpdateResponseSchema } from '@app/types/dtos';
import { AppNextApiRequest } from '@app/types/index';
import { createApiHandler, respond } from '@app/utils/createa-api-handler';
import getSubdomain from '@app/utils/get-subdomain';
import prisma from '@app/utils/prisma-client';
import triggerTaskLoadDatasource from '@app/utils/trigger-task-load-datasource';
import validate from '@app/utils/validate';

const handler = createApiHandler();

export const upsert = async (req: AppNextApiRequest, res: NextApiResponse) => {
  const host = req?.headers?.['host'];
  const subdomain = getSubdomain(host!);
  const data = req.body as UpdateRequestSchema;

  // get Bearer token from header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')?.[1];

  if (!subdomain) {
    return res.status(400).send('Missing subdomain');
  }

  const datastore = await prisma.datastore.findUnique({
    where: {
      id: subdomain,
    },
    include: {
      apiKeys: true,
    },
  });

  if (!datastore) {
    throw new Error('Not found');
  }

  if (
    datastore.visibility === DatastoreVisibility.private &&
    (!token || !datastore.apiKeys.find((each) => each.key === token))
  ) {
    throw new Error('Unauthorized');
  }

  const datasource = await prisma.appDatasource.findUnique({
    where: {
      id: data.id,
    },
  });

  if (datasource?.datastoreId !== datastore.id) {
    throw new Error('Unauthorized');
  }

  const updated = await prisma.appDatasource.update({
    where: {
      id: data.id,
    },
    data: {
      status: DatasourceStatus.pending,
      config: {
        ...(datasource.config as {}),
        ...data.metadata,
      },
    },
  });

  try {
    await triggerTaskLoadDatasource(data.id, data.text);
  } catch (err) {
    console.log('ERROR TRIGGERING TASK', err);

    await prisma.appDatasource.update({
      where: {
        id: data.id,
      },
      data: {
        status: DatasourceStatus.error,
      },
    });
  }

  return {
    id: data.id,
  } as UpdateResponseSchema;
};

handler.post(
  validate({
    body: UpdateRequestSchema,
    handler: respond(upsert),
  })
);

export default handler;
