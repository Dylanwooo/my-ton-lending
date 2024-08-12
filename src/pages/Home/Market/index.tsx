import { values } from 'lodash';
import { memo, useCallback } from 'react';
import { Box } from '@mui/material';

import AssetCard from './AssetCard';

import { ReservesInfo, useReservesInfoMap } from '@/pages/Home/contexts/ReservesProvider';
import { useUserBalance } from '@/pages/Home/contexts/UserBalanceProvider';
import { JettonSymbol } from '@/hooks';

export const Market = memo(() => {
  const { reservesInfoMap } = useReservesInfoMap();
  const { jettonBalanceMap, tonBalance } = useUserBalance();

  const getReserveBalanceBySymbol = useCallback(
    (symbol: string) => {
      if (symbol === 'TON') return tonBalance;

      return jettonBalanceMap ? jettonBalanceMap[symbol as JettonSymbol]?.balance : '0';
    },
    [jettonBalanceMap, tonBalance]
  );

  return (
    <>
      {values(reservesInfoMap).length
        ? values(reservesInfoMap).map((reserveInfo: ReservesInfo) => (
            <Box key={reserveInfo.symbol}>
              <AssetCard
                balance={getReserveBalanceBySymbol(reserveInfo.symbol) || '0'}
                reserveInfo={reserveInfo}
              />
            </Box>
          ))
        : // TODO: should be skeleton
          null}
    </>
  );
});
