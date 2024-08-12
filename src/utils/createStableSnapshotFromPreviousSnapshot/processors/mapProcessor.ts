import { isEqual, isMap } from 'lodash';

import { Processor } from '../types';

export const mapProcessor: Processor<Map<string, any>> = {
  match: (current, prev) => isMap(current) && isMap(prev),
  strictEqual: (current, prev) => current === prev,
  process: (current, prev, createStableSnapshot) => {
    const keys = Array.from(current.keys());
    const result = new Map(keys.map(k => [k, createStableSnapshot(current.get(k), prev.get(k))]));

    const resultKeys = Array.from(result.keys());
    if (isEqual(keys, resultKeys) && keys.every(key => result.get(key) === prev.get(key))) {
      return prev;
    }

    return result;
  }
};
