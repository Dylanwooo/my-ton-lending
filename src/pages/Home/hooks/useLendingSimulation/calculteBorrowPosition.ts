import { sumBy } from '@parallel-mono/utils';
import BigNumberJs from 'bignumber.js';

import { Action, ActionTypeEnum } from './index';

import { zero } from '@/utils';

export const calculteBorrowPosition = (
  borrowActions: Action[],
  currentTotalBorrowedPositionInUsd: BigNumberJs
) => {
  const totalBorrowValue = sumBy(borrowActions, ({ type, targetAsset }) =>
    type === ActionTypeEnum.BORROW ? targetAsset.value : targetAsset.value.negated()
  )?.plus(currentTotalBorrowedPositionInUsd);
  return BigNumberJs.max(totalBorrowValue, zero);
};
