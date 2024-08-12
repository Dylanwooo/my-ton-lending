import { useMemo } from 'react';
import { chain, isNil } from 'lodash';
import { BigNumber } from 'bignumber.js';
import { fromNano } from '@ton/core';

import { useReservesInfoMap } from '@/pages/Home/contexts/ReservesProvider';
import { useUserPosition } from '@/pages/Home/contexts/UserPositionProvider';

type Asset = {
  id: string;
  value: BigNumber;
  LTV: BigNumber;
  reserveLiquidationThreshold: BigNumber;
};

const useSuppliedAssets = () => {
  const { reservesInfoMap } = useReservesInfoMap();
  const { userPositionMap } = useUserPosition();

  const assets = useMemo(
    () =>
      chain(reservesInfoMap)
        .map(token => {
          if (token && token.symbol && userPositionMap[token.symbol]) {
            const suppliedAmountInUsd = BigNumber(
              fromNano(userPositionMap[token.symbol]?.supply.toString())
            ).times(fromNano(token.price));

            return {
              id: token.symbol,
              value: suppliedAmountInUsd,
              LTV: BigNumber(token.ltv.toString()),
              reserveLiquidationThreshold: BigNumber(token.liquidationThreshold.toString())
            };
          }
          return null;
        })
        .filter(it => !isNil(it))
        .value() as Asset[],
    [reservesInfoMap, userPositionMap]
  );

  return assets;
};

export default useSuppliedAssets;
