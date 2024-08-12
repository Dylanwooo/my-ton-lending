import { PrizePool, Help, Lottery, Home } from './subpages';

import { Tap } from './index';

import { MobilePageLayout } from '@/components/Layout';

export const tapRoute = {
  path: '/tap',
  element: <Tap />,
  children: [
    {
      path: '',
      element: (
        <MobilePageLayout>
          <Home />
        </MobilePageLayout>
      )
    },
    {
      path: 'prize-pool',
      element: (
        <MobilePageLayout fullPage showBack>
          <PrizePool />
        </MobilePageLayout>
      )
    },
    {
      path: 'lottery',
      element: (
        <MobilePageLayout fullPage showBack>
          <Lottery />
        </MobilePageLayout>
      )
    },
    {
      path: 'help',
      element: (
        <MobilePageLayout fullPage showBack>
          <Help />
        </MobilePageLayout>
      )
    }
  ]
};
