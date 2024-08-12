import { TonConnectButton } from '@tonconnect/ui-react';
import { Stack } from '@mui/material';

import { FlexBoxRow } from '@/components/styled';
import { Logo } from '@/components/Header/Logo';
import { FaucetBanner } from '@/components/Faucet';

export const MobileHeader = () => {
  return (
    <>
      <FlexBoxRow
        style={{
          justifyContent: 'space-between',
          padding: '16px',
          background: 'aliceblue'
        }}
      >
        <Logo />
        <Stack gap="4px" alignItems="center">
          <TonConnectButton />
        </Stack>
      </FlexBoxRow>
      {/* <FaucetBanner /> */}
    </>
  );
};
