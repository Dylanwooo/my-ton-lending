import { useState, ChangeEvent, memo, useCallback } from 'react';
import { DialogContent, DialogActions, Button, Typography, TextField } from '@mui/material';

import { ReservesInfo } from '@/pages/Home/contexts/ReservesProvider';
import { useLendingDialogState } from '@/pages/Home/contexts/LendingDialogProvider';
import { useRepayJetton } from '@/pages/Home/hooks';
import AssetBadge from '@/pages/Home/components/AssetBadge';

type RepayProps = {
  onClose: () => void;
};

export const Repay = memo(({ onClose }: RepayProps) => {
  const [amount, setAmount] = useState('');

  const { updateStatus, dialogProps } = useLendingDialogState();

  const { asyncRepay } = useRepayJetton();
  const { symbol, reserveInfo } = dialogProps;

  const reserveAddress = reserveInfo?.reserveAddress;

  const handleRepay = useCallback(async () => {
    if (!amount || !reserveAddress) return;

    await asyncRepay(reserveAddress.toString(), amount);
  }, [amount, asyncRepay, reserveAddress]);

  return (
    <DialogContent>
      <Typography>{`Repay ${symbol}`}</Typography>

      <TextField
        fullWidth
        placeholder="Repay amount"
        value={amount}
        InputProps={{
          endAdornment: <AssetBadge symbol={symbol} logo={reserveInfo?.logo} />
        }}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setAmount(event.target.value);
        }}
      />

      <Button
        fullWidth
        variant="contained"
        onClick={() => {
          handleRepay();
          // TODO: should do this in Tonkeeper callback
          setTimeout(() => {
            updateStatus('pending');
          }, 2000);
        }}
      >
        Confirm
      </Button>
    </DialogContent>
  );
});
