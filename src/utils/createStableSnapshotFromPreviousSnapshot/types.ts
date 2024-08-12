export type StableSnapshotCreator<T> = (current: T, prev: T) => T;

export type Processor<T> = {
  match: (a: unknown, b: unknown) => boolean;
  strictEqual: (a: T, b: T) => boolean;
  process: (a: T, b: T, createStableSnapshot: StableSnapshotCreator<T>) => T;
};
