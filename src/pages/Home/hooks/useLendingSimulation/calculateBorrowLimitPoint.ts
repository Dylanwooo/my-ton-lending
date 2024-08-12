import { sumBy, weightedSumBy } from '@parallel-mono/utils';
import BigNumberJs from 'bignumber.js';

import { zero } from '@/utils';

export type Asset = {
  value: BigNumberJs;
  LTV: BigNumberJs;
  reserveLiquidationThreshold: BigNumberJs;
};

export const calculateBorrowLimitPoint = (
  assets: Asset[],
  avgLiquidationThreshold: BigNumberJs,
  avgLtv: BigNumberJs
) => {
  const totalAssetValue = BigNumberJs.max(
    sumBy(
      assets.filter(each => each?.LTV?.gt(0)),
      'value'
    ),
    zero
  );
  return {
    borrowLimit: totalAssetValue.times(avgLtv),
    totalCollateral: totalAssetValue,
    liquidationPoint: totalAssetValue.times(avgLiquidationThreshold)
  };
};
