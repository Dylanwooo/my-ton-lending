import { memo, useCallback, useEffect, useRef } from 'react';
import { useInterval } from 'react-use';
import { useTonAddress } from '@tonconnect/ui-react';
import { Spinner } from '@parallel-mono/components';
import { Typography, Stack } from '@mui/material';
import { Transaction, CommonMessageInfoInternal, address } from '@ton/core';

import { useUserPosition } from '@/pages/Home/contexts/UserPositionProvider';
import { useUserBalance } from '@/pages/Home/contexts/UserBalanceProvider';
import { useAccountTransaction } from '@/pages/Home/hooks';
import { useLendingDialogState } from '@/pages/Home/contexts/LendingDialogProvider';
import { useToast } from '@/conntexts';
import { useTonClient } from '@/hooks';
import { traverseTx } from '@/pages/Home/utils';

export const TransactionChecker = memo(() => {
  const { getAccountLatestTx } = useAccountTransaction();
  const userFriendlyAddress = useTonAddress();
  const { refreshBalance, latestTx: storedTx } = useUserBalance();
  const { refreshUserPosition } = useUserPosition();
  const toast = useToast();
  const { client } = useTonClient();

  const { dialogProps, updateDialogProps, updateStatus } = useLendingDialogState();

  const isFinalized = useRef(false);

  const pollTransactionResult = useCallback(async () => {
    if (isFinalized.current) return;

    // 1. Get the latest transaction
    const latestTx = await getAccountLatestTx(userFriendlyAddress);

    // 2. Check if the tx is fullfilled
    if (latestTx && storedTx && latestTx.hash !== storedTx.hash) {
      refreshBalance();
      refreshUserPosition();

      isFinalized.current = true;

      toast.success('Transaction completed successfully!');
      updateDialogProps({ ...dialogProps, visible: false });
      updateStatus('initial');
    }
  }, [
    dialogProps,
    getAccountLatestTx,
    refreshBalance,
    refreshUserPosition,
    storedTx,
    toast,
    updateDialogProps,
    updateStatus,
    userFriendlyAddress
  ]);

  /**
   * Traverse outgoing transactions
   */
  const findOutgoingTransactions = useCallback(
    (transaction: Transaction): any => {
      const outMessagesInfos = transaction.outMessages
        .values()
        .map(message => message.info)
        .filter((info): info is CommonMessageInfoInternal => info.type === 'internal');

      return Promise.all(
        outMessagesInfos.map(info =>
          client.tryLocateResultTx(info.src, info.dest, info.createdLt.toString())
        )
      );
    },
    [client]
  );

  const traverseOutgoingTransactions = useCallback(
    async (transaction: Transaction): Promise<void> => {
      const outTxs = await findOutgoingTransactions(transaction);

      console.log('outTxs', outTxs);
      await Promise.all(outTxs.map(out => traverseOutgoingTransactions(out)));
    },
    [findOutgoingTransactions]
  );

  const asyncStart = useCallback(async () => {
    const txs = await client.getTransactions(address(userFriendlyAddress), { limit: 1 });

    console.log('txs', txs);

    await traverseOutgoingTransactions(txs[0]);
    // await Promise.all(txs.map(tx => traverseOutgoingTransactions(tx)));
  }, [client, traverseOutgoingTransactions, userFriendlyAddress]);

  // useEffect(() => {
  //   asyncStart();
  // }, [asyncStart]);

  // useInterval(asyncStart, 2500);

  useInterval(pollTransactionResult, 2500);

  return (
    <Stack gap="12px" p="16px" alignItems="center" justifyContent="center">
      <Spinner size="large" />
      <Typography color="gray" textAlign="center">
        This may take up to 20 seconds. Please do not close the modal.
      </Typography>
    </Stack>
  );
});
