import { memo } from 'react';
import { Typography } from '@mui/material';
import BigNumber from 'bignumber.js';

import { formatToCurrency } from '@/utils';

type UsdEquivalentProps = {
  priceInUsd: string;
  value: string;
};

export const UsdEquivalent = memo(({ priceInUsd, value }: UsdEquivalentProps) => {
  return (
    <Typography color="gray" fontSize={12}>
      {formatToCurrency(BigNumber(priceInUsd?.toString()).times(value))}
    </Typography>
  );
});
