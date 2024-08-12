import { beginCell, toNano, Cell, address } from '@ton/core';
import { useCallback } from 'react';
import { useTonAddress } from '@tonconnect/ui-react';

import { Pool } from '@/contracts/Pool';
import { SampleJetton } from '@/contracts/SampleJetton';
import { JettonDefaultWallet } from '@/contracts/JettonDefaultWallet';
import { useTonConnect, useTonClient } from '@/hooks';

export const useSupply2Pool = () => {
  const { client } = useTonClient();
  const { sender } = useTonConnect();

  const userFriendlyAddress = useTonAddress();

  const asyncSupplyTon = useCallback(
    async (amount: string) => {
      const pool = client!.open(await Pool.fromInit());

      await pool.send(
        sender,
        {
          value: toNano(+amount + 0.25)
        },
        {
          $$type: 'SupplyTon',
          amount: toNano(amount)
        }
      );
    },
    [client, sender]
  );

  const asyncSupply = useCallback(
    async (jettonAddress: string, amount: string) => {
      if (!client) throw new Error('Client is not initialized');

      if (!jettonAddress) return;
      const pool = client!.open(await Pool.fromInit());
      const poolAddress = pool.address;
      const reserveAddress = address(jettonAddress);

      if (reserveAddress.equals(poolAddress)) {
        // supply Ton
        await asyncSupplyTon(amount);
      } else {
        const sampleJetton = client.open(SampleJetton.fromAddress(reserveAddress));

        const userJettonWalletAddress = await sampleJetton.getGetWalletAddress(
          address(userFriendlyAddress)
        );

        const providerJettonWallet = client?.open(
          JettonDefaultWallet.fromAddress(userJettonWalletAddress)
        );

        const forwardPayload: Cell = beginCell().storeUint(0x55b591ba, 32).endCell();

        await providerJettonWallet?.send(
          sender,
          {
            value: toNano('0.24') // Estimated gas fee
          },
          {
            $$type: 'TokenTransfer',
            queryId: 0n,
            // TODO: need to use exact decimal instead of toNano
            amount: toNano(amount),
            destination: poolAddress,
            response_destination: userJettonWalletAddress,
            custom_payload: null,
            forward_ton_amount: toNano('0.19'),
            forward_payload: forwardPayload
          }
        );
      }
    },
    [asyncSupplyTon, client, sender, userFriendlyAddress]
  );

  return { asyncSupply };
};
