import React, { useState } from 'react';
import { Stack } from '@mui/material';

import HomeComponent from './Home';

import Summery from '@/pages/Home/components/Summery';
import Invite from '@/pages/Home/components/Invite';
import ReservesProvider from '@/pages/Home/contexts/ReservesProvider';
import UserPositionProvider from '@/pages/Home/contexts/UserPositionProvider';
import UserBalanceProvider from '@/pages/Home/contexts/UserBalanceProvider';
import LendingDialogProvider from '@/pages/Home/contexts/LendingDialogProvider';

export const Home: React.FC = () => {
  const [curTab, setCurTab] = useState(1);

  return (
    <ReservesProvider>
      <UserPositionProvider>
        <UserBalanceProvider>
          <LendingDialogProvider>
            <Stack gap="16px">
              <HomeComponent />
            </Stack>
          </LendingDialogProvider>
        </UserBalanceProvider>
      </UserPositionProvider>
    </ReservesProvider>
  );
};
