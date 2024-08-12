import TonLogo from '@/Icons/crypto/ton.png';
import usdtLogo from '@/Icons/crypto/usdt.png';
import NotLogo from '@/Icons/crypto/not.png';

export type JettonConfig = {
  tokenAddress: string;
  symbol: string;
  displayName: string;
  decimals: number;
  logo: string;
};

export enum JettonSymbol {
  MAS = 'MAS',
  NOT = 'NOT',
  pTON = 'pTON',
  'USD₮' = 'USD₮',
  TON = 'TON'
}

/**
 * @dev Should update the tokenAddress every time the pool update
 * @returns Jettons on market
 */
export const useJettonConfigs = (): Record<JettonSymbol, JettonConfig> => {
  // TODO: mainnet config
  return {
    [JettonSymbol.TON]: {
      symbol: JettonSymbol.TON,
      displayName: 'TON',
      decimals: 9,
      // @dev The tokenAddres for Ton token is pool address
      tokenAddress: 'EQCgwRzMb1OqISfebwy74eJ7cxigdJC4ZpZDqpQVufP7cx07',
      logo: TonLogo
    },
    [JettonSymbol.NOT]: {
      symbol: JettonSymbol.NOT,
      displayName: 'NOT',
      decimals: 9,
      tokenAddress: 'EQD8-IT-fOEuBqY5bG_NY3lcZTKnnKv-7_UuILidV2eCa4W-',
      logo: NotLogo
    },
    [JettonSymbol.pTON]: {
      symbol: JettonSymbol.pTON,
      displayName: 'pTON',
      decimals: 9,
      tokenAddress: 'EQBvOgGXLdZOysRTnw2UDc_KRwcD5HLVH139DZ3AnK04LcxH',
      logo: TonLogo
    },
    [JettonSymbol['USD₮']]: {
      symbol: JettonSymbol['USD₮'],
      displayName: 'USD₮',
      decimals: 6,
      tokenAddress: 'EQColXOG7C2X8x0ZFT-3Ot5sYknz-JbLnJzI1eVNldQlX2Bu',
      logo: usdtLogo
    },
    [JettonSymbol.MAS]: {
      symbol: JettonSymbol.MAS,
      displayName: 'MAS',
      decimals: 9,
      tokenAddress: 'EQBe9prUeNqHJHRw4YWDZhXI91kiGaGTTHuCWIaY975Uw2AU',
      logo: 'https://ipfs.io/ipfs/bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4/welcome-to-IPFS.jpg'
    }
  };
};
