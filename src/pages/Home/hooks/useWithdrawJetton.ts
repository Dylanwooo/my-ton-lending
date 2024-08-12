import { useCallback } from 'react';
import { Address, toNano } from '@ton/core';

import { UINT256_MAX } from '@/utils';
import { useTonClient, useTonConnect } from '@/hooks';
import { Pool } from '@/contracts/Pool';

export const useWithdrawJetton = () => {
  const { client } = useTonClient();
  const { sender } = useTonConnect();

  const asyncWithdraw = useCallback(
    async (address: string, amount: string, isWithdrawAll: boolean) => {
      if (!client) return;

      const pool = client.open(await Pool.fromInit());

      const tokenAddress = Address.parse(address);

      // Ton withdraw
      if (pool.address.equals(tokenAddress)) {
        await pool.send(
          sender,
          {
            value: toNano('0.4')
          },
          {
            $$type: 'WithdrawTon',
            amount: isWithdrawAll ? toNano(UINT256_MAX) : toNano(amount)
          }
        );
      } else {
        await pool.send(
          sender,
          {
            value: toNano('0.25')
          },
          {
            $$type: 'WithdrawToken',
            tokenAddress,
            amount: isWithdrawAll ? toNano(UINT256_MAX) : toNano(amount)
          }
        );
      }
    },
    [client, sender]
  );

  return {
    asyncWithdraw
  };
};
