import { CheckIcon } from '@heroicons/react/20/solid';
import Card from '@mui/joy/Card';
import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

import { Footer } from '@app/components/landing-page/Footer';
import { Header } from '@app/components/landing-page/Header';
import { Hero } from '@app/components/landing-page/Hero';

export default function Home() {
  return (
    <>
      <Head>
        <title>Databerry - Pricing</title>
        <meta
          name="description"
          content="Simple Pricing. No hidden fees. No credit card required."
        />
      </Head>
      <Header />
      <main className="flex flex-col min-h-full mb-auto bg-black">
        <Example />
      </main>
      <Footer />
    </>
  );
}

const frequencies = [
  { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
  { value: 'annually', label: 'Annually', priceSuffix: '/year' },
];
const tiers = [
  {
    name: 'Discover',
    id: 'tier-free',
    href: '/signin',
    price: { monthly: '$0', annually: '$144' },
    description: 'The essentials to get started quickly.',
    features: [
      '1 datastore',
      'Up to 10 datasources per datastore',
      'Manual data synching',
      'File uplpoad limited to 1MB / file',
      'API Access to query a datastore',
      'ChatGPT plugin',
    ],
    mostPopular: false,
  },
  {
    name: 'Startup',
    id: 'tier-startup',
    href: '/signin',
    price: { monthly: '$25', annually: '$288' },
    description: 'A plan that scales with your rapidly growing business.',
    features: [
      'Everything from the free plan',
      'Access to Chat Site',
      'Chat Site Bot trained on 25 pages max',
      'auto synch datasources',
      '5 datastores',
      'Up to 30 datasource per datastore',
      'Auto synch datasources',
      'File uplpoad limited to 5MB / file',
    ],
    mostPopular: true,
  },
  {
    name: 'Pro',
    id: 'tier-enterprise',
    href: '/signin',
    price: { monthly: '$99', annually: '$576' },
    description: 'Dedicated support and for your company.',
    features: [
      'Everything from the startup plan',
      '15 datastores',
      'Up to 50 datasource per datastore',
      'File uplpoad limited to 10MB / file',
    ],
    mostPopular: false,
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

function Example() {
  const [frequency, setFrequency] = useState(frequencies[0]);

  return (
    <div className="py-24 bg-black sm:py-32">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Pricing plans for teams of&nbsp;all&nbsp;sizes
          </p>
        </div>
        <p className="max-w-2xl mx-auto mt-6 text-lg leading-8 text-center text-gray-300">
          Choose an affordable plan that’s packed with the best features for
          engaging your audience, creating customer loyalty, and driving sales.
        </p>
        {/* <div className="flex justify-center mt-16">
          <RadioGroup
            value={frequency}
            onChange={setFrequency}
            className="grid grid-cols-2 p-1 text-xs font-semibold leading-5 text-center text-white rounded-full gap-x-1 bg-white/5"
          >
            <RadioGroup.Label className="sr-only">
              Payment frequency
            </RadioGroup.Label>
            {frequencies.map((option) => (
              <RadioGroup.Option
                key={option.value}
                value={option}
                className={({ checked }) =>
                  classNames(
                    checked ? 'bg-indigo-500' : '',
                    'cursor-pointer rounded-full px-2.5 py-1'
                  )
                }
              >
                <span>{option.label}</span>
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div> */}
        <div className="grid max-w-md grid-cols-1 gap-8 mx-auto mt-16 isolate lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.id}
              className={classNames(
                tier.mostPopular
                  ? 'bg-white/5 ring-2 ring-indigo-500'
                  : 'ring-1 ring-white/10',
                'rounded-3xl p-8 xl:p-10'
              )}
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3
                  id={tier.id}
                  className="text-lg font-semibold leading-8 text-white"
                >
                  {tier.name}
                </h3>
                {tier.mostPopular ? (
                  <p className="rounded-full bg-indigo-500 px-2.5 py-1 text-xs font-semibold leading-5 text-white">
                    Most popular
                  </p>
                ) : null}
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-300">
                {tier.description}
              </p>
              <p className="flex items-baseline mt-6 gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-white">
                  {tier.id === 'tier-free'
                    ? 'Free'
                    : (tier as any).price[frequency.value]}
                </span>
                {tier.id !== 'tier-free' && (
                  <span className="text-sm font-semibold leading-6 text-gray-300">
                    {frequency.priceSuffix}
                  </span>
                )}
              </p>
              <Link
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? 'bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500'
                    : 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white',
                  'mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
                )}
              >
                {tier.id === 'tier-free' ? 'Sign Up' : 'Subscribe'}
              </Link>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-gray-300 xl:mt-10"
              >
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className={clsx('flex gap-x-3', {
                      'text-green-400':
                        feature.includes('ChatGPT') ||
                        feature.includes('Chat Site'),
                    })}
                  >
                    <CheckIcon
                      className={clsx('flex-none w-5 h-6 text-white')}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
