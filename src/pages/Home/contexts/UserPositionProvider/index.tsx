import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  memo,
  useRef
} from 'react';
import { Address } from '@ton/core';
import BigNumber from 'bignumber.js';
import { useTonAddress } from '@tonconnect/ui-react';
import { values, mapKeys, isEmpty, sum, map } from 'lodash';

import {
  useTonClient,
  useJettonConfigs,
  JettonSymbol,
  useStabilizedSnapshot,
  useTonConnect
} from '@/hooks';
import { Pool } from '@/contracts/Pool';
import { UserAccount } from '@/contracts/UserAccount';
import { useReservesInfoMap } from '@/pages/Home/contexts/ReservesProvider';
import { DEFAULT_JETTON_DECIMAL, RAY } from '@/utils';
import { Maybe } from '@/types';
import {
  getTonClientV4,
  formatUserAccountHealthInfo,
  FormattedUserAccountHealthInfo
} from '@/pages/Home/utils';

export type UserPosition = {
  symbol: JettonSymbol;
  tokenAddress: string;
  supply: BigNumber;
  asCollateral: boolean;
  borrow: BigNumber;
  logo: string;
  decimals: string | number;
};

type UserPositionContextValue = {
  userPositionMap: Record<JettonSymbol, UserPosition> | null;
  borrowPositionList: UserPosition[];
  supplyPositionList: UserPosition[];
  refreshUserPosition: () => Promise<void>;
  userAccountHealthInfo: FormattedUserAccountHealthInfo | null;
};

export type OverviewUserInfo = {
  totalSuppliedPositionsInUsd: BigNumber;
  totalBorrowedPositionInUsd: BigNumber;
  totalCollateralPositionInUsd: BigNumber;
  liquidationThresholdInUsd: BigNumber;
  borrowLimitInUsd: BigNumber;
  healthFactor: Maybe<BigNumber>;
};

const DEFAULT_OVERVIEW_USER_INFO: OverviewUserInfo = {
  totalSuppliedPositionsInUsd: new BigNumber(0),
  totalBorrowedPositionInUsd: new BigNumber(0),
  totalCollateralPositionInUsd: new BigNumber(0),
  liquidationThresholdInUsd: new BigNumber(0),
  borrowLimitInUsd: new BigNumber(0),
  healthFactor: null
};

// Create the context
const UserPositionContext = createContext<UserPositionContextValue | undefined>(undefined);

// Custom hook to access the context value
export const useUserPosition = (): UserPositionContextValue => {
  const context = useContext(UserPositionContext);
  if (!context) {
    throw new Error('useReservesInfo must be used within a ReservesProvider');
  }
  return context;
};

// Provider component to initialize the reserves data
const UserPositionProvider = ({ children }: { children: ReactNode }) => {
  const [userPosition, setUserPosition] = useState<UserPosition[]>([]);
  const [userAccountHealthInfo, setUserAccountHealthInfo] =
    useState<FormattedUserAccountHealthInfo>(null);
  const isInitialized = useRef<Boolean | null>(null);
  const { isMainnet } = useTonConnect();
  const userFriendlyAddress = useTonAddress();
  const jettonConfigs = useJettonConfigs();
  const { reservesInfoMap } = useReservesInfoMap();

  const { client } = useTonClient();

  const asyncGetUserPosition = useCallback(async () => {
    if (!client || !userFriendlyAddress) return;

    const initalPool = await Pool.fromInit();

    const pool = client!.open(initalPool);

    const clientV4 = await getTonClientV4(isMainnet ? 'mainnet' : 'testnet');

    const poolV4 = clientV4!.open(initalPool);

    const poolAddress = pool.address;
    const userAddress = Address.parse(userFriendlyAddress);

    const userAccountContract = client!.open(await UserAccount.fromInit(poolAddress, userAddress));

    const isUserAccountContractDeployed = await client.isContractDeployed(
      userAccountContract.address
    );

    if (!isUserAccountContractDeployed) {
      console.error('User Account Contract is not deployed');
      return;
    }

    const userAccount = await userAccountContract.getAccount();

    const healthInfo = await poolV4.getUserAccountHealthInfo(userAccount);

    setUserAccountHealthInfo(formatUserAccountHealthInfo(healthInfo));

    const { positionsLength, positions, positionsDetail } = userAccount;

    const positionMap = [];

    for (let i = 0; i < positionsLength; i++) {
      const jettonAddress = positions.get(BigInt(i));

      if (!jettonAddress) return;

      const detail = {
        ...positionsDetail.get(positions.get(BigInt(i))!!)
      } as unknown as UserPosition;

      const symbol = values(jettonConfigs).find(
        config => config.tokenAddress === jettonAddress?.toString()
      )?.symbol as JettonSymbol;

      const liquilityIdx = reservesInfoMap[symbol]?.liquidityIndex.toString();
      const normalizedDebt = reservesInfoMap[symbol]?.normalizedDebt.toString();
      const decimals = DEFAULT_JETTON_DECIMAL;

      detail.supply = BigNumber(detail.supply.toString()).times(liquilityIdx).sd(+decimals);
      detail.borrow = BigNumber(detail.borrow.toString()).times(normalizedDebt).sd(+decimals);
      detail.tokenAddress = jettonAddress.toString();
      detail.symbol = symbol;
      detail.decimals = decimals;
      detail.logo = jettonConfigs[symbol].logo;

      positionMap.push(detail);

      isInitialized.current = true;
    }

    setUserPosition(positionMap);
  }, [client, userFriendlyAddress, isMainnet, jettonConfigs, reservesInfoMap]);

  const borrowPositionList = useMemo(() => {
    if (!userPosition || !userPosition.length) return [];
    return userPosition
      .map(({ symbol, borrow, decimals, logo }: UserPosition) => {
        return {
          symbol,
          borrow,
          decimals,
          logo
        };
      })
      .filter(({ borrow }) => !borrow.isZero());
  }, [userPosition]);

  const supplyPositionList = useMemo(() => {
    if (!userPosition || !userPosition.length) return [];

    return userPosition
      .map(({ symbol, supply, decimals, asCollateral, logo }: UserPosition) => {
        return {
          symbol,
          supply,
          decimals,
          asCollateral,
          logo
        };
      })
      .filter(({ supply }) => !supply.isZero());
  }, [userPosition]);

  const overviewUserInfo = useMemo(() => {
    if (!userPosition || !userPosition.length || !reservesInfoMap)
      return DEFAULT_OVERVIEW_USER_INFO;

    // return {
    //   totalSuppliedPositionsInUsd,
    //   totalBorrowedPositionInUsd
    // } as OverviewUserInfo;
  }, [reservesInfoMap, userPosition]);

  useEffect(() => {
    if (isEmpty(reservesInfoMap)) return;

    if (!isInitialized.current) asyncGetUserPosition();
  }, [asyncGetUserPosition, reservesInfoMap]);

  const contextValue: UserPositionContextValue = useMemo(
    () =>
      ({
        userPositionMap: mapKeys(userPosition, value => value.symbol),
        borrowPositionList,
        supplyPositionList,
        refreshUserPosition: asyncGetUserPosition,
        userAccountHealthInfo
      } as UserPositionContextValue),
    [
      userPosition,
      borrowPositionList,
      supplyPositionList,
      asyncGetUserPosition,
      userAccountHealthInfo
    ]
  );

  const stabilizedValue = useStabilizedSnapshot(contextValue);

  return (
    <UserPositionContext.Provider value={stabilizedValue}>{children}</UserPositionContext.Provider>
  );
};

export default memo(UserPositionProvider);
