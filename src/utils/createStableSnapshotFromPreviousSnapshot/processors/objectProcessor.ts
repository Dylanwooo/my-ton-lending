import { isEqual, isFunction, isObject, keys, mapValues } from 'lodash';

import { Processor } from '../types';

export const objectProcessor: Processor<Record<string, any>> = {
  match: (current, prev) =>
    isObject(current) && isObject(prev) && !isFunction(current) && !isFunction(prev),
  strictEqual: (current, prev) => current === prev,
  process: (current, prev, createStableSnapshot) => {
    const result = mapValues(current, (currentValue, key) =>
      createStableSnapshot(currentValue, prev[key])
    );

    const prevKeys = keys(prev);
    const resultKeys = keys(result);
    if (isEqual(prevKeys, resultKeys) && prevKeys.every(key => prev[key] === result[key])) {
      return prev;
    }

    return result;
  }
};
