import { ReactNode, createContext, useContext, memo, useMemo, useState, useCallback } from 'react';

import { useStabilizedSnapshot, JettonSymbol } from '@/hooks';
import { LendingType } from '@/pages/Home/components/LendingDialog';
import { ReservesInfo } from '@/pages/Home/contexts/ReservesProvider';
import { Maybe } from '@/types';

type TxStatus = 'initial' | 'pending' | 'success' | 'error';

export type LendingDialogProps = {
  visible: boolean;
  symbol: JettonSymbol;
  type: LendingType | null;
  reserveInfo: ReservesInfo;
};

type LendingDialogContextState = {
  status: TxStatus;
  dialogProps: LendingDialogProps;
  updateDialogProps: (newDialogProps: LendingDialogProps) => void;
  updateStatus: (newStatus: TxStatus) => void;
};

const LendingDialogContext = createContext<LendingDialogContextState>({
  status: 'initial',
  dialogProps: {
    visible: false,
    symbol: JettonSymbol.TON,
    type: null,
    reserveInfo: null
  },
  updateDialogProps: () => {},
  updateStatus: () => {}
});

export const useLendingDialogState = (): LendingDialogContextState => {
  const context = useContext(LendingDialogContext);

  return context;
};

const LendingDialogProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<TxStatus>('initial');
  const [dialogProps, setDialogProps] = useState<LendingDialogProps>({
    visible: false,
    symbol: JettonSymbol.TON,
    type: LendingType.Supply,
    reserveInfo: null
  });

  const updateStatus = useCallback(
    (newStatus: TxStatus) => {
      setStatus(newStatus);
    },
    [setStatus]
  );

  const updateDialogProps = useCallback((newDialogProps: LendingDialogProps) => {
    setDialogProps(newDialogProps);
  }, []);

  const contextValue = useMemo(
    () =>
      ({
        status,
        updateDialogProps,
        dialogProps,
        updateStatus
      } as LendingDialogContextState),
    [dialogProps, status, updateDialogProps, updateStatus]
  );

  const stabilizedValue = useStabilizedSnapshot(contextValue);

  return (
    <LendingDialogContext.Provider value={stabilizedValue}>
      {children}
    </LendingDialogContext.Provider>
  );
};

LendingDialogProvider.displayName = 'LendingDialogProvider';

export default memo(LendingDialogProvider);
