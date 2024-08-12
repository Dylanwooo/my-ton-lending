import BigNumber from 'bignumber.js';
import { fromNano } from 'ton-core';

import { RAY } from '@/utils';
import { UserAccountHealthInfo } from '@/contracts/Pool';

export type FormattedUserAccountHealthInfo = {
  avgLiquidationThreshold: BigNumber;
  avgLtv: BigNumber;
  healthFactor: BigNumber;
  totalCollateralInUsd: BigNumber;
  totalDebtInUsd: BigNumber;
  totalSupplyInUsd: BigNumber;
};

export const formatUserAccountHealthInfo = (
  userAccountHealthInfo: Omit<UserAccountHealthInfo, '$$type'>
) => {
  const {
    avgLiquidationThreshold,
    avgLtv,
    healthFactorInRay,
    totalCollateralInBaseCurrency,
    totalDebtInBaseCurrency,
    totalSupplyInBaseCurrency
  } = userAccountHealthInfo;

  return {
    avgLiquidationThreshold: BigNumber(avgLiquidationThreshold.toString()).div(10000),
    avgLtv: BigNumber(avgLtv.toString()).div(10000),
    healthFactor: BigNumber(healthFactorInRay.toString()).div(RAY),
    totalCollateralInUsd: BigNumber(fromNano(totalCollateralInBaseCurrency)),
    totalDebtInUsd: BigNumber(fromNano(totalDebtInBaseCurrency)),
    totalSupplyInUsd: BigNumber(fromNano(totalSupplyInBaseCurrency))
  } as FormattedUserAccountHealthInfo;
};
