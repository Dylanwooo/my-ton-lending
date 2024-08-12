import { address, Address, fromNano } from '@ton/core';
import { useCallback, useEffect, useState } from 'react';
import { useTonAddress } from '@tonconnect/ui-react';
import { Api, JettonBalance } from 'tonapi-sdk-js';
import { values } from 'lodash';

import { JettonSymbol, useJettonConfigs, useHttpClient, useConfigs } from '@/hooks';
import { getFetcher } from '@/utils';

export const useWalletBalance = () => {
  const { TON_CENETER_API } = useConfigs();
  const httpClient = useHttpClient();
  const userFriendlyAddress = useTonAddress();
  const jettonConfigs = useJettonConfigs();

  const [tonBalance, setTonBalance] = useState<string | null>(null);

  const getAccountJettonsBalance = useCallback(
    async (userAddress: string) => {
      if (!userAddress) return;

      const accountId = Address.parse(userAddress).toRawString();
      // Initialize the API client
      const tonApiClient = new Api(httpClient);
      // Obtain information about a specific jetton
      const { balances } = await tonApiClient.accounts.getAccountJettonsBalances(accountId, {
        currencies: ['ton']
      });

      const balancesMap = {} as Record<JettonSymbol, { symbol: JettonSymbol; balance: string }>;

      // tranverse jetton balances to get the item that match token address in jettonConfigs
      balances.map((balanceObj: JettonBalance) => {
        const { balance, jetton } = balanceObj;

        const jettonAddress = address(jetton.address);

        const symbol = values(jettonConfigs).find(config =>
          jettonAddress.equals(address(config.tokenAddress))
        )?.symbol;

        if (symbol) {
          balancesMap[symbol as JettonSymbol] = {
            symbol: symbol as JettonSymbol,
            balance: fromNano(balance).toString()
          };
        }
      });

      return balancesMap;
    },
    [httpClient, jettonConfigs]
  );

  // Fetch Ton balance
  const asyncFetchTonBalance = useCallback(async () => {
    try {
      if (!userFriendlyAddress) return;

      const { result }: any = await getFetcher<{
        ok: boolean;
        result: string;
      }>(`${TON_CENETER_API}/getAddressBalance`, {
        params: { address: userFriendlyAddress }
      });

      if (result) {
        setTonBalance(fromNano(result).toString());
      }
    } catch (error) {
      console.error('Error fetching ton balance:', error);
    }
  }, [TON_CENETER_API, userFriendlyAddress]);

  useEffect(() => {
    asyncFetchTonBalance();
  }, [asyncFetchTonBalance]);

  return {
    tonBalance,
    getAccountJettonsBalance
  };
};
