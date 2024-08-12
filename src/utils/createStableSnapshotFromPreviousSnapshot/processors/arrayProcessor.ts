import { isArray, map } from 'lodash';

import { Processor } from '../types';

export const arrayProcessor: Processor<Array<any>> = {
  match: (current, prev) => isArray(current) && isArray(prev),
  strictEqual: (current, prev) => current === prev,
  process: (current, prev, createStableSnapshot) => {
    const result = map(current, (currentValue, index) =>
      createStableSnapshot(currentValue, prev[index])
    );

    if (
      result.length === prev.length &&
      result.every((resultValue, index) => resultValue === prev[index])
    ) {
      return prev;
    }

    return result;
  }
};
