import { formatNumber as formatNumberUtil } from '@parallel-mono/utils';
import BigNumber from 'bignumber.js';

import { DEFAULT_JETTON_DECIMAL } from './constants';

const MIN_PERCENTAGE_THRESHOLD = 0.0001;

export const formatBalance = (
  number: number | BigNumber | null | undefined,
  decimal: number = DEFAULT_JETTON_DECIMAL
) =>
  formatNumberUtil(number ?? 0, {
    decimal
  });

export const formatToCurrency = (
  number: number | BigNumber,
  {
    decimal = 2,
    min = 10 ** -decimal,
    averageMinLength = 6
  }: {
    decimal?: number;
    min?: number;
    averageMinLength?: number;
  } = {}
) => {
  return formatNumberUtil(number, {
    output: 'currency',
    decimal,
    averageMinLength,
    threshold: {
      min
    }
  });
};

export const formatToPercentage = (number: number | BigNumber, decimal = 2) => {
  return formatNumberUtil(number, {
    decimal,
    output: 'percent',
    threshold: BigNumber(number).lt(0)
      ? {
          max: -MIN_PERCENTAGE_THRESHOLD
        }
      : {
          min: MIN_PERCENTAGE_THRESHOLD
        }
  });
};
