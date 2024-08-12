import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
  useRef
} from 'react';
import { useTonAddress } from '@tonconnect/ui-react';
import { Transaction } from 'tonapi-sdk-js';

import { Maybe } from '@/types';
import { useWalletBalance, useAccountTransaction } from '@/pages/Home/hooks';
import { useStabilizedSnapshot } from '@/hooks';

// Define the shape of the user balance context
type UserBalanceContextType = {
  jettonBalanceMap: Maybe<Record<string, { symbol: string; balance: string }>>;
  tonBalance: string | null;
  balanceLoading: boolean;
  latestTx: Maybe<Transaction>;
  updateLatestTx: (tx: Transaction) => void;
  refreshBalance: () => Promise<void>;
};

export const UserBalanceContext = createContext<UserBalanceContextType>({
  jettonBalanceMap: null,
  tonBalance: null,
  latestTx: null,
  updateLatestTx: () => {},
  balanceLoading: false,
  refreshBalance: async () => {}
});

export const useUserBalance = (): UserBalanceContextType => {
  const context = useContext(UserBalanceContext);

  if (!context) {
    throw new Error('useUserBalance must be used within a UserBalanceProvider');
  }
  return context;
};

const UserBalanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jettonBalanceMap, setJettonBalanceMap] =
    useState<Maybe<Record<string, { symbol: string; balance: string }>>>(null);
  const [balanceLoading, setBalanceLoading] = useState<boolean>(false);
  const [latestTx, setlatestTx] = useState<Maybe<Transaction>>(null);

  const { tonBalance, getAccountJettonsBalance } = useWalletBalance();

  const userFriendlyAddress = useTonAddress();
  const { getAccountLatestTx } = useAccountTransaction();

  const isInitialized = useRef(false);

  const updateLatestTx = useCallback((tx: Transaction) => {
    if (tx) setlatestTx(tx);
  }, []);

  const refreshBalance = useCallback(async () => {
    try {
      const [tx, balanceMap] = await Promise.all([
        await getAccountLatestTx(userFriendlyAddress),
        await getAccountJettonsBalance(userFriendlyAddress)
      ]);

      setJettonBalanceMap(balanceMap);
      setlatestTx(tx);
    } catch (e) {
      console.error(e);
    } finally {
      setBalanceLoading(false);
    }
  }, [getAccountJettonsBalance, getAccountLatestTx, userFriendlyAddress]);

  const handleInitialRefresh = useCallback(async () => {
    try {
      setBalanceLoading(true);

      if (!userFriendlyAddress || isInitialized.current) return;

      await refreshBalance();

      isInitialized.current = true;
    } catch (e) {
      console.error(e);
    } finally {
      setBalanceLoading(false);
    }
  }, [refreshBalance, userFriendlyAddress]);

  useEffect(() => {
    handleInitialRefresh();
  }, [handleInitialRefresh]);

  const contextValue: UserBalanceContextType = useMemo(
    () => ({
      jettonBalanceMap,
      updateLatestTx,
      tonBalance,
      balanceLoading,
      latestTx,
      refreshBalance
    }),

    [jettonBalanceMap, updateLatestTx, tonBalance, balanceLoading, latestTx, refreshBalance]
  );

  const stabilizedValue = useStabilizedSnapshot(contextValue);
  return (
    <UserBalanceContext.Provider value={stabilizedValue}>{children}</UserBalanceContext.Provider>
  );
};

export default memo(UserBalanceProvider);
