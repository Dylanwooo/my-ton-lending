import BigNumber from 'bignumber.js';

import { Processor } from '../types';

export const bigNumberProcessor: Processor<BigNumber> = {
  match: (current, prev) => BigNumber.isBigNumber(current) && BigNumber.isBigNumber(prev),
  strictEqual: (current, prev) => current === prev || current.eq(prev),
  process: current => current
};
