import { useMemo } from 'react';
import BigNumber from 'bignumber.js';

import { useTonConnect } from '@/hooks';

export const useValidation = ({ balance, amount }: { amount: string; balance: string }) => {
  const { connected } = useTonConnect();

  return useMemo(() => {
    if (!balance) {
      return 'Balance not loaded';
    }

    if (!connected) {
      return 'Please connect wallet';
    }

    if (amount === null) {
      return 'Enter an amount';
    }

    if (+amount <= 0) {
      return 'Invalid input';
    }

    if (BigNumber(balance).lt(amount)) {
      return 'Insufficient balance';
    }

    return null;
  }, [amount, balance, connected]);
};

export const useWithdrawValidation = ({
  supplied,
  availableToWithdraw,
  amount
}: {
  amount: string;
  availableToWithdraw: BigNumber;
  supplied: string;
}) =>
  useMemo(() => {
    if (!supplied) {
      return 'Supply data is not loaded';
    }

    if (amount === null) {
      return 'Enter an amount';
    }

    if (!Number.isFinite(+amount) || +amount <= 0) {
      return 'Invalid input';
    }
  }, [supplied, amount]);
