import { useMemo } from 'react';

import { useTonConnect } from '@/hooks/useTonConnect';

export const useConfigs = () => {
  const { isMainnet } = useTonConnect();

  const TON_CENETER_API = useMemo(() => {
    if (isMainnet) return 'https://toncenter.com/api/v2';

    return 'https://testnet.toncenter.com/api/v2';
  }, [isMainnet]);

  return {
    TON_CENETER_API
  };
};
