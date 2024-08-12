import { Api, Transactions } from 'tonapi-sdk-js';
import { address } from '@ton/core';
import { useCallback, useEffect, useMemo } from 'react';
import { useTonAddress } from '@tonconnect/ui-react';

import { getFetcher } from '@/utils';
import { useHttpClient, useConfigs, useTonClient } from '@/hooks';
// Using Tonapi sdk
export const useAccountTransaction = () => {
  const httpClient = useHttpClient();
  const userFriendlyAddress = useTonAddress();
  const { TON_CENETER_API } = useConfigs();
  const { client } = useTonClient();

  const clientInstance = useMemo(() => new Api(httpClient), [httpClient]);

  const getAccountLatestTx = useCallback(
    async (userAddress: string) => {
      if (!userFriendlyAddress) return;

      const accountId = address(userAddress).toRawString();

      const { transactions }: Transactions =
        await clientInstance.blockchain.getBlockchainAccountTransactions(accountId, { limit: 5 });

      return transactions[0];
    },
    [userFriendlyAddress, clientInstance]
  );

  return {
    getAccountLatestTx
  };
};
