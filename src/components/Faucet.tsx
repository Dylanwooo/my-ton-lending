import { Alert, Link, Button } from '@mui/material';
import { useCallback } from 'react';

import { useMintSampleJetton } from '@/pages/Home/hooks';
import { useTonConnect } from '@/hooks';

export const FaucetBanner = () => {
  const { isMainnet, connected } = useTonConnect();
  const { asyncMint } = useMintSampleJetton();

  const handleMintTestJettons = useCallback(async () => {
    await Promise.all([await asyncMint('EQD8-IT-fOEuBqY5bG_NY3lcZTKnnKv-7_UuILidV2eCa4W-')]);
  }, [asyncMint]);

  if (isMainnet || !connected) return null;

  return (
    <Alert severity="info" icon={false} sx={{ justifyContent: 'space-between' }}>
      <Link href="https://t.me/testgiver_ton_bot">Official faucet</Link>
    </Alert>
  );
};
