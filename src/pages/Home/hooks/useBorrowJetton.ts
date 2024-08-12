import { address, Address, toNano } from '@ton/core';
import { useCallback } from 'react';

import { useTonClient, useTonConnect } from '@/hooks';
import { Pool } from '@/contracts/Pool';

export const useBorrowJetton = () => {
  const { client } = useTonClient();
  const { sender } = useTonConnect();

  const asyncBorrow = useCallback(
    async (jettonAddress: string, amount: string) => {
      if (!client) throw new Error('Client is not initialized');

      const poolContract = await Pool.fromInit();
      const pool = client!.open(poolContract);

      if (pool.address.equals(address(jettonAddress))) {
        await pool.send(
          sender,
          {
            value: toNano('0.75')
          },
          {
            $$type: 'BorrowTon',
            amount: toNano(amount)
          }
        );
      } else {
        await pool.send(
          sender,
          {
            value: toNano('0.25')
          },
          {
            $$type: 'BorrowToken',
            tokenAddress: Address.parse(jettonAddress),
            amount: toNano(amount)
          }
        );
      }
    },
    [client, sender]
  );

  return { asyncBorrow };
};
