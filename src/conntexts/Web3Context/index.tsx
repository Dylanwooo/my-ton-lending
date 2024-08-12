import { useTonConnectUI } from '@tonconnect/ui-react';
import {
  FC,
  ReactNode,
  createContext,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
// import { useInterval } from 'react-use';

import { TonProofService } from '../../services';

type ContextValue = {
  authorized: boolean;
};
const Web3Context = createContext<ContextValue>({
  authorized: false
});

/**
 * @dev Ton poof docs: https://github.com/ton-connect/sdk/tree/main/packages/ui-react#add-connect-request-parameters-ton_proof
 */
export const Web3ContextProvider: FC<{ children: ReactNode }> = memo(({ children }) => {
  const [authorized, setAuthorized] = useState(false);

  const [tonConnectUI] = useTonConnectUI();
  const firstProofLoading = useRef<boolean>(true);

  // const tonProofService = useMemo(() => new TonProofService(), []);

  // const recreateProofPayload = useCallback(async () => {
  //   if (firstProofLoading.current) {
  //     tonConnectUI.setConnectRequestParameters({ state: 'loading' });
  //     firstProofLoading.current = false;
  //   }

  //   const payload = await tonProofService.generatePayload();

  //   if (payload) {
  //     tonConnectUI.setConnectRequestParameters({
  //       state: 'ready',
  //       value: payload
  //     });
  //   } else {
  //     tonConnectUI.setConnectRequestParameters(null);
  //   }
  // }, [tonProofService, tonConnectUI]);

  // useEffect(() => {
  //   if (firstProofLoading.current) {
  //     recreateProofPayload();
  //   }
  // }, [recreateProofPayload]);

  // useInterval(recreateProofPayload, tonProofService.refreshIntervalMs);

  // useEffect(
  //   () =>
  //     tonConnectUI.onStatusChange(async w => {
  //       if (!w) {
  //         tonProofService.reset();
  //         setAuthorized(false);
  //         return;
  //       }

  //       if (w.connectItems?.tonProof && 'proof' in w.connectItems.tonProof) {
  //         await tonProofService.checkProof(w.connectItems.tonProof.proof, w.account);
  //       }

  //       if (!tonProofService.accessToken) {
  //         tonConnectUI.disconnect();
  //         setAuthorized(false);
  //         return;
  //       }
  //       setAuthorized(true);
  //     }),
  //   [tonConnectUI, tonProofService]
  // );

  const value = useMemo(() => ({ authorized }), [authorized]);

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
});
