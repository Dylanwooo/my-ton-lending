import { Processor } from '../types';

export const defaultProcessor: Processor<Record<string, any>> = {
  match: () => true,
  strictEqual: (current, prev) => current === prev,
  process: current => current
};
