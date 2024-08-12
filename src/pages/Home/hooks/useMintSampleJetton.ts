import { Address, OpenedContract, toNano } from '@ton/core';
import { useTonAddress } from '@tonconnect/ui-react';
import { useCallback } from 'react';

import { SampleJetton } from '@/contracts/SampleJetton';
import { useTonConnect, useTonClient } from '@/hooks';

export const useMintSampleJetton = () => {
  const { client } = useTonClient();
  const { sender } = useTonConnect();
  const userFriendlyAddress = useTonAddress();

  const asyncMint = useCallback(
    async (jettonAddress: string) => {
      if (!client || !jettonAddress) return;

      if (!client.isContractDeployed(Address.parse(jettonAddress))) return;

      const contract = SampleJetton.fromAddress(Address.parse(jettonAddress));

      const sampleJetton = client!.open(contract) as OpenedContract<SampleJetton>;

      await sampleJetton.send(
        sender,
        {
          value: toNano('0.05') // Estimated transaction fee
        },
        {
          $$type: 'Mint',
          queryId: 0n,
          amount: toNano('10'), // Mint amount
          receiver: Address.parse(userFriendlyAddress)
        }
      );
    },
    [client, sender, userFriendlyAddress]
  );

  return { asyncMint };
};
