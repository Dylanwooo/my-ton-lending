import { useState, ChangeEvent, memo, useCallback } from 'react';
import { DialogContent, Button, Typography, TextField } from '@mui/material';

import AssetBadge from '@/pages/Home/components/AssetBadge';
import { useBorrowJetton } from '@/pages/Home/hooks';
import { useLendingDialogState } from '@/pages/Home/contexts/LendingDialogProvider';
import BorrowInfo from '@/pages/Home/components/LendingDialog/Borrow/BorrowInfo';

type BorrowProps = {
  onClose: () => void;
};

export const Borrow = memo(({ onClose }: BorrowProps) => {
  const [amount, setAmount] = useState('');

  const { asyncBorrow } = useBorrowJetton();
  const { updateStatus, dialogProps } = useLendingDialogState();

  const { symbol, reserveInfo } = dialogProps;

  const reserveAddress = reserveInfo?.reserveAddress;

  const handleBorrow = useCallback(async () => {
    if (!amount || !reserveAddress) return;

    await asyncBorrow(reserveAddress.toString(), amount);
  }, [amount, asyncBorrow, reserveAddress]);

  return (
    <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Typography>{`Borrow ${symbol}`}</Typography>

      <TextField
        fullWidth
        placeholder="Borrow amount"
        value={amount}
        InputProps={{
          endAdornment: <AssetBadge symbol={symbol} logo={reserveInfo?.logo} />
        }}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setAmount(event.target.value);
        }}
      />

      <BorrowInfo amount={amount} reserveInfo={reserveInfo} />

      <Button
        fullWidth
        variant="contained"
        onClick={() => {
          handleBorrow();

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
