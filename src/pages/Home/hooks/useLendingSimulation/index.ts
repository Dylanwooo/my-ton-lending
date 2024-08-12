import BigNumberJs from 'bignumber.js';
import { useMemo } from 'react';
import { isNil } from 'lodash';

import { Asset, calculateBorrowLimitPoint } from './calculateBorrowLimitPoint';
import { calculteBorrowPosition } from './calculteBorrowPosition';
import useSuppliedAssets from './useSuppliedAssets';

import { useUserPosition } from '@/pages/Home/contexts/UserPositionProvider';
import { FormattedUserAccountHealthInfo } from '@/pages/Home/utils';

export enum ActionTypeEnum {
  BORROW = 'BORROW',
  REPAY = 'REPAY',
  SUPPLY = 'SUPPLY',
  WITHDRAW = 'WITHDRAW'
}

export type Action = {
  type: ActionTypeEnum;
  // the asset lending attribute (value: totalWorthInUsd, ltv etc...)
  targetAsset: Asset;
};

export const calculateLendingSimulation = (
  actions: Action[],
  assets: Asset[],
  overviewUserInfo: any,
  userAccountHealthInfo: FormattedUserAccountHealthInfo,
  userInfoLoaded: boolean
) => {
  if (!userInfoLoaded) {
    return {
      totalBorrowedPositionInUsd: new BigNumberJs(0),
      borrowLimitInUsd: new BigNumberJs(0),
      liquidationThresholdInUsd: new BigNumberJs(0),
      totalCollateralPositionInUsd: new BigNumberJs(0)
    };
  }

  const { avgLiquidationThreshold, avgLtv } = userAccountHealthInfo;

  // borrow
  const borrowActions = actions.filter(action =>
    [ActionTypeEnum.BORROW, ActionTypeEnum.REPAY].includes(action.type)
  );
  const totalBorrowedPositionInUsd = calculteBorrowPosition(
    borrowActions,
    overviewUserInfo.totalBorrowedPositionInUsd
  );

  // supply
  const supplyActions = actions.filter(action =>
    [ActionTypeEnum.SUPPLY, ActionTypeEnum.WITHDRAW].includes(action.type)
  );

  const assetsAfterActions = assets.concat(
    supplyActions.map(({ type, targetAsset }) =>
      type === ActionTypeEnum.SUPPLY
        ? targetAsset
        : {
            ...targetAsset,
            value: targetAsset.value.negated()
          }
    )
  );

  const info = calculateBorrowLimitPoint(assetsAfterActions, avgLiquidationThreshold, avgLtv);

  return {
    totalBorrowedPositionInUsd,
    borrowLimitInUsd: info.borrowLimit,
    liquidationThresholdInUsd: info.liquidationPoint,
    totalCollateralPositionInUsd: info.totalCollateral
  };
};

/**
 * simulation users' lending action and return users' lending overview info after those actions
 * each action represents a unique operation related to a single asset
 *
 * for example, if you want to see how borrowLimit change after user supplying 100 USDC.
 * actions should be
 * [{
 *    type: ActionTypeEnum.SUPPLY,
 *    targetAsset: {
 *      value: usdcPriceInUsd * 100, // worth in total
 *      ltv: usdcLtv,
 *      ...
 *    }
 * }]
 * @param actions
 */
export const useLendingSimulation = (actions: Action[]) => {
  const assets = useSuppliedAssets();
  const { userAccountHealthInfo } = useUserPosition();

  const { totalDebtInUsd } = userAccountHealthInfo ?? {};

  const overviewUserInfo = useMemo(
    () => ({
      totalborrowedPositionInUsd: totalDebtInUsd
    }),
    [totalDebtInUsd]
  );
  const userInfoLoaded = useMemo(() => !isNil(userAccountHealthInfo), [userAccountHealthInfo]);

  return useMemo(() => {
    return calculateLendingSimulation(
      actions,
      assets,
      overviewUserInfo,
      userAccountHealthInfo,
      userInfoLoaded
    );
  }, [actions, assets, overviewUserInfo, userAccountHealthInfo, userInfoLoaded]);
};
