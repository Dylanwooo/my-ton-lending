import { useEffect, useMemo, useRef } from 'react';

import { createStableSnapshotFromPreviousSnapshot } from '../utils/createStableSnapshotFromPreviousSnapshot';

export const useStabilizedSnapshot = <T>(value: T): T => {
  const prevRef = useRef<T>(value);

  const result = useMemo(
    () => createStableSnapshotFromPreviousSnapshot(value, prevRef.current),
    [value]
  );

  useEffect(() => {
    prevRef.current = result;
  }, [result]);

  return result;
};
