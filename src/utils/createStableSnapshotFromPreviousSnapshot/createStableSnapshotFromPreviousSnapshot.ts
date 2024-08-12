import { processors } from './processors';

export const createStableSnapshotFromPreviousSnapshot = <T>(current: T, prev: any) => {
  const processor = processors.find(it => it.match(current, prev))!;

  if (processor.strictEqual(current, prev)) {
    return prev;
  }

  const result = processor.process(current, prev, createStableSnapshotFromPreviousSnapshot);

  return result;
};
