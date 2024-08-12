import { Button, DialogContent, TextField, Typography, Avatar, Stack } from '@mui/material';
import { useState, useCallback, ChangeEvent, useMemo } from 'react';

import { useValidation } from '../hooks';

import SupplyInfo from './SupplyInfo';

import { useTonConnect } from '@/hooks';
import { useUserBalance } from '@/pages/Home/contexts/UserBalanceProvider';
import { ReservesInfo } from '@/pages/Home/contexts/ReservesProvider';
import { useLendingDialogState } from '@/pages/Home/contexts/LendingDialogProvider';
import { useSupply2Pool, useLendingSimulation } from '@/pages/Home/hooks';
import AssetBadge from '@/pages/Home/components/AssetBadge';

type SupplyProps = {
  onClose: () => void;
};
export const Supply = ({ onClose }: SupplyProps) => {
  const [amount, setAmount] = useState('');
  const [formTouched, setFormTouched] = useState(false);
  const { asyncSupply } = useSupply2Pool();
  const { connected } = useTonConnect();

  const { updateStatus, dialogProps } = useLendingDialogState();
  const { symbol, reserveInfo = {} as ReservesInfo } = dialogProps;

  const reserveAddress = reserveInfo?.reserveAddress;

  const handleSupply = useCallback(async () => {
    if (!amount || !reserveAddress) return;

    await asyncSupply(reserveAddress.toString(), amount);
  }, [amount, asyncSupply, reserveAddress]);

  const handleInputBlur = useCallback(() => {
    setFormTouched(true);
  }, []);

  const { jettonBalanceMap, tonBalance } = useUserBalance();

  const balance = useMemo(() => {
    if (symbol === 'TON') return tonBalance || '0';

    return jettonBalanceMap ? jettonBalanceMap[symbol]?.balance : '0';
  }, [jettonBalanceMap, symbol, tonBalance]);

  const errorMessage = useValidation({ amount, balance });

  const hasError = useMemo(() => Boolean(errorMessage && formTouched), [errorMessage, formTouched]);

  return (
    <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Typography align="right" my="4px" color="gray">
        Available: {balance}
      </Typography>
      <Stack gap="4px">
        <TextField
          fullWidth
          placeholder="Supply amount"
          value={amount}
          onBlur={handleInputBlur}
          InputProps={{
            endAdornment: <AssetBadge symbol={symbol} logo={reserveInfo?.logo} />
          }}
          error={hasError}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setFormTouched(true);
            setAmount(event.target.value);
          }}
        />

        {hasError && <Typography color="red">{errorMessage}</Typography>}
      </Stack>

      <SupplyInfo amount={amount} reserveInfo={reserveInfo} />

      <Button
        sx={{ mt: '48px' }}
        variant="contained"
        fullWidth
        disabled={hasError || !connected}
        onClick={() => {
          handleSupply();

          // TODO: should do this in Tonkeeper callback
          setTimeout(() => {
            updateStatus('pending');
          }, 2000);
        }}
      >
        {hasError ? errorMessage : `Supply ${symbol}`}
      </Button>
    </DialogContent>
  );
};
