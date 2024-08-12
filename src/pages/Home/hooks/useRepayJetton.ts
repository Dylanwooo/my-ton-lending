import { beginCell, toNano, Cell, address } from '@ton/core';
import { useTonAddress } from '@tonconnect/ui-react';
import { useCallback } from 'react';

import { useTonConnect, useTonClient } from '@/hooks';
import { Pool } from '@/contracts/Pool';
import { SampleJetton } from '@/contracts/SampleJetton';
import { JettonDefaultWallet } from '@/contracts/JettonDefaultWallet';

export const useRepayJetton = () => {
  const { client } = useTonClient();
  const { sender } = useTonConnect();
  const userFriendlyAddress = useTonAddress();

  const asyncRepay = useCallback(
    async (jettonAddress: string, amount: string) => {
      if (!client) throw new Error('Client is not initialized');
      if (!jettonAddress || !userFriendlyAddress) return;

      const poolContract = await Pool.fromInit();
      const pool = client!.open(poolContract);

      const reserveAddress = address(jettonAddress);

      // TON repay
      if (pool.address.equals(reserveAddress)) {
        await pool.send(
          sender,
          {
            value: toNano('0.35')
          },
          {
            $$type: 'RepayTon',
            amount: toNano(amount)
          }
        );
      } else {
        const sampleJetton = client.open(SampleJetton.fromAddress(reserveAddress));
        const userJettonWalletAddress = await sampleJetton.getGetWalletAddress(
          address(userFriendlyAddress)
        );
        const providerJettonWallet = client.open(
          JettonDefaultWallet.fromAddress(userJettonWalletAddress)
        );

        const forwardPayload: Cell = beginCell().storeUint(0x9c797a9, 32).endCell();

        await providerJettonWallet.send(
          sender,
          {
            value: toNano('0.25')
          },
          {
            $$type: 'TokenTransfer',
            queryId: 0n,
            amount: toNano(amount),
            destination: pool.address,
            response_destination: userJettonWalletAddress,
            custom_payload: null,
            forward_ton_amount: toNano('0.15'),
            forward_payload: forwardPayload
          }
        );
      }
    },
    [client, sender, userFriendlyAddress]
  );

  return { asyncRepay };
};
