import BigNumber from 'bignumber.js';
import { isNil } from 'lodash';

import { LIQUIDITY_INDEX_DECIMAL, SECONDS_PER_YEAR, RAY, formatToPercentage } from '@/utils';
import { Maybe } from '@/types';

/**
 *
 * @param currentRate supply -> currentLiquidityRate, borrow -> currentBorrowRate
 * @returns percentage string
 */
export const getEffectiveApy = ({
  currentRate,
  extraAPY
}: {
  currentRate: Maybe<BigNumber>;
  extraAPY?: BigNumber;
}) => {
  if (isNil(currentRate)) {
    return '-';
  }

  const part1 = BigNumber(1).plus(
    BigNumber(currentRate.toString()).div(BigNumber(RAY)).div(SECONDS_PER_YEAR)
  );

  const apy = BigNumber(part1.toNumber() ** SECONDS_PER_YEAR - 1);

  return formatToPercentage(apy.plus(extraAPY ?? 0));
};
