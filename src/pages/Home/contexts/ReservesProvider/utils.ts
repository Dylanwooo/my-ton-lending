import BigNumber from 'bignumber.js';

import { ReservesInfo } from './index';

import { getEffectiveApy } from '@/pages/Home/utils';
import { MULTIPLIER_BASE_DECIMAL, LIQUIDITY_INDEX_DECIMAL } from '@/utils/constants';

export const formatReserveData = (reserveData: ReservesInfo) => {
  const { currentLiquidityRate, currentBorrowRate, totalBorrow, availableLiquidity } = reserveData;
  const supplyApy = getEffectiveApy({ currentRate: BigNumber(currentLiquidityRate.toString()) });

  const borrowApy = getEffectiveApy({ currentRate: BigNumber(currentBorrowRate.toString()) });

  const utilization =
    !totalBorrow || !availableLiquidity
      ? 0
      : BigNumber(totalBorrow.toString())?.div(
          BigNumber(totalBorrow.toString())?.plus(availableLiquidity.toString())
        );
  return {
    ...reserveData,
    ltv: new BigNumber(reserveData.ltv.toString()).shiftedBy(-MULTIPLIER_BASE_DECIMAL),
    liquidityIndex: BigNumber(reserveData.liquidityIndex.toString())
      .shiftedBy(-LIQUIDITY_INDEX_DECIMAL)
      .toString(),
    borrowIndex: BigNumber(reserveData.borrowIndex.toString())
      .shiftedBy(-LIQUIDITY_INDEX_DECIMAL)
      .toString(),
    normalizedDebt: BigNumber(reserveData.normalizedDebt.toString())
      .shiftedBy(-LIQUIDITY_INDEX_DECIMAL)
      .toString(),
    supplyApy,
    utilization,
    borrowApy
  };
};
