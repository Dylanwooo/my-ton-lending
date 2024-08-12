import { fromNano } from '@ton/core';
import BigNumber from 'bignumber.js';

export const DEFAULT_JETTON_DECIMAL = 9;
export const TESTNET_EXPLORER = 'https://testnet.tonviewer.com';
export const MAINNET_EXPLORER = 'https://tonviewer.com';

export const LIQUIDITY_INDEX_DECIMAL = 27;
export const MULTIPLIER_BASE_DECIMAL = 4;

export const UINT256_MAX = fromNano(
  '115792089237316195423570985008687907853269984665640564039457584007913129639935'
);

export const HEALTHY_FACTOR_WITH_CUSHION_FOR_WITHDRAW = 1.01;

export const zero: BigNumber = new BigNumber(0);

export const SECONDS_PER_YEAR = 365 * 24 * 3600;

export const RAY = '1000000000000000000000000000';
