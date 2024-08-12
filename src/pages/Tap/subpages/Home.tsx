import { memo } from 'react';

import { Menus } from '../components';

import { Stack } from '@/components/Layout';

export const Home = memo(() => {
  return (
    <Stack>
      <Menus />
    </Stack>
  );
});
