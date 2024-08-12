import { TonClient } from '@ton/ton';
import { useMemo } from 'react';

import { TON_RPC_API_KEY } from '@/utils';
import { useTonConnect } from '@/hooks/useTonConnect';

// return the RPC client
export const useTonClient = () => {
  const { isMainnet, network } = useTonConnect();

  const client = useMemo(() => {
    const endpoint = isMainnet
      ? 'https://toncenter.com/api/v2/jsonRPC'
      : 'https://testnet.toncenter.com/api/v2/jsonRPC';

    return new TonClient({
      endpoint,
      apiKey: TON_RPC_API_KEY
    });
  }, [isMainnet]);

  return {
    client
  };
};
