import { ReactNode } from 'react';

import { tapRoute } from './pages/Tap/routes';
import { MobilePageLayout } from './components/Layout';

import { Home, Leaderboard, Friends } from '@/pages';

type RouteConfig = {
  path: string;
  element: ReactNode;
  featureKey?: string;
  toggleKey?: string;
  preHeatKey?: string;
  children?: RouteConfig[];
};

const fullRoutes: RouteConfig[] = [
  {
    path: '/',
    element: (
      <MobilePageLayout>
        <Home />
      </MobilePageLayout>
    )
  },
  tapRoute,
  {
    path: '/leaderboard',
    element: (
      <MobilePageLayout>
        <Leaderboard />
      </MobilePageLayout>
    )
  },
  {
    path: '/friends',
    element: (
      <MobilePageLayout>
        <Friends />
      </MobilePageLayout>
    )
  },
  {
    path: '*',
    element: (
      <MobilePageLayout>
        <Home />
      </MobilePageLayout>
    )
  }
];

export const useAppRoutes = () => {
  return fullRoutes;
};
