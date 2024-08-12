import BigNumber from 'bignumber.js';

import { LIQUIDITY_INDEX_DECIMAL } from '@/utils/constants';

export type ReserveConfigData = {
  liquidityIndex: string;
  currentLiquidityRate: string;
  borrowIndex: string;
  currentBorrowRate: string;
  totalSupply: string;
  availableLiquidity: string;
  accruedToTreasury: string;
  totalBorrow: string;
  lastUpdateTimestamp: string;
  price: string;
};

export const formatReserveData = (rawReserveData: any) => {
  const formattedReserveData: ReserveConfigData = {
    ...rawReserveData,
    liquidityIndex: BigNumber(rawReserveData.liquidityIndex.toString())
      .shiftedBy(-LIQUIDITY_INDEX_DECIMAL)
      .toString(),
    currentLiquidityRate: rawReserveData.currentLiquidityRate.toString(),
    borrowIndex: BigNumber(rawReserveData.borrowIndex.toString())
      .shiftedBy(-LIQUIDITY_INDEX_DECIMAL)
      .toString(),
    currentBorrowRate: rawReserveData.currentBorrowRate.toString(),
    totalSupply: rawReserveData.totalSupply.toString(),
    availableLiquidity: rawReserveData.availableLiquidity.toString(),
    accruedToTreasury: rawReserveData.accruedToTreasury.toString(),
    totalBorrow: rawReserveData.totalBorrow.toString(),
    lastUpdateTimestamp: rawReserveData.lastUpdateTimestamp.toString(),
    price: rawReserveData.price.toString()
  };

  return formattedReserveData;
};
