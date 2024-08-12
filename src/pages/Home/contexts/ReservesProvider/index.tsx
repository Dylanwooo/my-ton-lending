import { createContext, useContext, useState, ReactNode, useCallback, useMemo, memo } from 'react';
import { address, Address } from '@ton/core';
import { keys, mapKeys, values } from 'lodash';
import { useEffectOnce } from 'react-use';
import BigNumber from 'bignumber.js';

import { formatReserveData } from './utils';

import { JettonSymbol, useTonClient, useJettonConfigs, useStabilizedSnapshot } from '@/hooks';
import {
  Pool,
  ReserveData,
  ReserveDataAndConfiguration,
  ReserveConfiguration
} from '@/contracts/Pool';

export type ReservesInfo = Omit<ReserveData, '$$type'> &
  Omit<ReserveConfiguration, '$$type'> & {
    symbol: JettonSymbol;
    logo: string;
    reserveAddress: Address;
    normalizedDebt: BigInt;
    supplyApy: string;
    borrowApy: string;
    utilization: number | BigNumber;
  };

type ReservesContextValue = {
  reservesInfoMap: Record<JettonSymbol, ReservesInfo>;
  poolAddress: Address | null;
  totalDebt: BigNumber;
};

// Create the context
const ReservesContext = createContext<ReservesContextValue | undefined>(undefined);

// Custom hook to access the context value
export const useReservesInfoMap = (): ReservesContextValue => {
  const context = useContext(ReservesContext);
  if (!context) {
    throw new Error('useReservesInfoMap must be used within a ReservesProvider');
  }
  return context;
};

// Provider component to initialize the reserves data
const ReservesProvider = ({ children }: { children: ReactNode }) => {
  const [reservesInfo, setReservesInfo] = useState<ReservesInfo[]>([]);
  const [poolAddress, setPoolAddress] = useState<Address | null>(null);
  const jettonConfigs = useJettonConfigs();

  const { client } = useTonClient();

  const asynGetReservesInfo = useCallback(async () => {
    if (!client) return;

    const pool = client.open(await Pool.fromInit());

    setPoolAddress(pool.address);

    const allReserveDataAndConfiguration = await pool.getAllReserveDataAndConfiguration();

    const reservesInfolist: ReservesInfo[] = [];

    const jettonConfigsList = values(jettonConfigs);

    const reservesLength = allReserveDataAndConfiguration.size;

    for (let i = 0; i < reservesLength; i++) {
      if (!jettonConfigsList[i]?.tokenAddress) continue;

      const reserveAddress: Address = address(jettonConfigsList[i].tokenAddress);

      const symbol = keys(jettonConfigs)[i] as JettonSymbol;

      if (reserveAddress) {
        const config = allReserveDataAndConfiguration.get(reserveAddress);

        if (!config) continue;

        const {
          reserveConfiguration = {},
          reserveData = {},
          normalizedDebt
        } = config as ReserveDataAndConfiguration;

        reservesInfolist.push(
          // @ts-ignore
          formatReserveData({
            reserveAddress,
            symbol,
            normalizedDebt,
            logo: jettonConfigs[symbol].logo,
            ...reserveConfiguration,
            ...reserveData
          })
        );
      }
    }

    setReservesInfo(reservesInfolist);
  }, [client, jettonConfigs]);

  useEffectOnce(() => {
    asynGetReservesInfo();
  });

  const contextValue = useMemo(
    () =>
      ({
        reservesInfoMap: mapKeys(reservesInfo, value => value.symbol),
        poolAddress
      } as ReservesContextValue),
    [reservesInfo, poolAddress]
  );

  const stabilizedValue = useStabilizedSnapshot(contextValue);

  return <ReservesContext.Provider value={stabilizedValue}>{children}</ReservesContext.Provider>;
};
ReservesProvider.displayName = 'ReservesProvider';

export default memo(ReservesProvider);
