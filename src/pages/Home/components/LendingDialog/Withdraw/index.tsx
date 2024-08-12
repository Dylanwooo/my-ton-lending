import { useState, ChangeEvent, memo, useCallback, useMemo } from 'react';
import { DialogContent, DialogActions, Button, Typography, TextField } from '@mui/material';
import BigNumber from 'bignumber.js';
import { fromNano } from '@ton/core';

import { HEALTHY_FACTOR_WITH_CUSHION_FOR_WITHDRAW } from '@/utils';
import AssetBadge from '@/pages/Home/components/AssetBadge';
import { useWithdrawJetton } from '@/pages/Home/hooks';
import { useLendingDialogState } from '@/pages/Home/contexts/LendingDialogProvider';
import { ReservesInfo } from '@/pages/Home/contexts/ReservesProvider';
import { useUserPosition } from '@/pages/Home/contexts/UserPositionProvider';
import { useWithdrawValidation } from '@/pages/Home/components/LendingDialog/hooks';
import WithdrawInfo from '@/pages/Home/components/LendingDialog/Withdraw/WithdrawInfo';

type WithdrawProps = {
  onClose: () => void;
};

export const Withdraw = memo(({ onClose }: WithdrawProps) => {
  const [amount, setAmount] = useState('');
  const [formTouched, setFormTouched] = useState(false);
  const [isWithdrawAll, setIsWithdrawAll] = useState(false);

  const { asyncWithdraw } = useWithdrawJetton();
  const { updateStatus, dialogProps } = useLendingDialogState();
  const { userPositionMap } = useUserPosition();

  const { symbol, reserveInfo } = dialogProps;

  const reserveAddress = useMemo(() => reserveInfo?.reserveAddress, [reserveInfo]);

  const suppliedAmount = useMemo(() => {
    if (!userPositionMap) return '-';

    const userPosition = userPositionMap[symbol];

    return fromNano(userPosition?.supply?.toString()) || '0';
  }, [symbol, userPositionMap]);

  const usageAsCollateralEnabledOnUser = true; // Asset as collateral by default

  const priceInUsd = useMemo(() => fromNano(reserveInfo?.price?.toString() || 0), [reserveInfo]);

  const totalBorrowedPositionInUsd = useMemo(() => {
    if (!userPositionMap) return BigNumber(0);

    return BigNumber(priceInUsd).times(suppliedAmount);
  }, [priceInUsd, suppliedAmount, userPositionMap]);

  /**
   * @dev migrate from pac finance
   * */
  const availableToWithdraw = useMemo(() => {
    // liquidiationPoint - x * threshold * priceInUsd >= borrowedUsd * 1.01
    return BigNumber.maximum(
      0,
      BigNumber.minimum(
        suppliedAmount,
        usageAsCollateralEnabledOnUser && totalBorrowedPositionInUsd?.gt(0)
          ? BigNumber(reserveInfo?.liquidationThreshold?.toString())
              ?.minus(totalBorrowedPositionInUsd.times(HEALTHY_FACTOR_WITH_CUSHION_FOR_WITHDRAW))
              ?.div(priceInUsd)
              ?.div(reserveInfo?.liquidationThreshold?.toString())
          : suppliedAmount,
        reserveInfo?.availableLiquidity?.toString()
      )
    );
  }, [
    suppliedAmount,
    usageAsCollateralEnabledOnUser,
    totalBorrowedPositionInUsd,
    reserveInfo?.liquidationThreshold,
    reserveInfo?.availableLiquidity,
    priceInUsd
  ]);

  const errorMessage = useWithdrawValidation({
    amount,
    supplied: suppliedAmount,
    availableToWithdraw
  });

  const hasError = useMemo(() => Boolean(errorMessage && formTouched), [errorMessage, formTouched]);

  const handleClickMax = useCallback(() => {
    setAmount(availableToWithdraw.toString());
    setIsWithdrawAll(true);
  }, [availableToWithdraw]);

  const handleWithdraw = useCallback(async () => {
    if (!amount || !reserveAddress) return;

    await asyncWithdraw(reserveAddress.toString(), amount, isWithdrawAll);
  }, [amount, asyncWithdraw, isWithdrawAll, reserveAddress]);

  return (
    <DialogContent>
      <Typography align="right" my="4px" color="gray">
        Available: {suppliedAmount}
      </Typography>
      <TextField
        fullWidth
        placeholder="Withdraw amount"
        value={amount}
        InputProps={{
          endAdornment: <AssetBadge symbol={symbol} logo={reserveInfo?.logo} />
        }}
        error={hasError}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setAmount(event.target.value);
          setIsWithdrawAll(false);
        }}
      />
      <Typography align="right" onClick={handleClickMax} sx={{ textDecoration: 'underline' }}>
        Max
      </Typography>

      {hasError && <Typography color="red">{errorMessage}</Typography>}

      <WithdrawInfo amount={amount} reserveInfo={reserveInfo} />

      <Button
        fullWidth
        variant="contained"
        disabled={hasError}
        onClick={() => {
          handleWithdraw();

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
