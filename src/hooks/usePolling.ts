import { useCallback, useEffect, useMemo, MutableRefObject, useRef, useState } from 'react';
import { memoize, uniqueId } from 'lodash';

export enum FetchingStatus {
  INIT = 'INIT',
  FETCHING = 'FETCHING',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL'
}

type Props = {
  pollingInterval: number;
  pollFn: () => Promise<void>;
  autoStart?: boolean;
};

const generateTaskIdFromSeeds = memoize((_seed: any) => uniqueId());

export const usePolling = ({ pollingInterval, pollFn, autoStart = true }: Props) => {
  const [pollingStatus, setPollingStatus] = useState(FetchingStatus.INIT);

  const [manualTaskId, setManualTaskId] = useState<string | null>(null);
  const taskIdRef: MutableRefObject<string | null> = useRef<string | null>(null);

  const taskIdSeed = useMemo(
    () => ({
      pollFn,
      manualTaskId,
      pollingInterval
    }),
    [manualTaskId, pollFn, pollingInterval]
  );

  const taskId = useMemo(() => generateTaskIdFromSeeds(taskIdSeed), [taskIdSeed]);

  const task = useMemo(
    () => ({
      taskId,
      execute: pollFn,
      interval: pollingInterval
    }),
    [pollFn, pollingInterval, taskId]
  );

  taskIdRef.current = task.taskId;

  const timerRef = useRef<number>(null);

  const loopPollingTask = useCallback(() => {
    setPollingStatus(FetchingStatus.FETCHING);
    task
      .execute()
      .then(() => {
        if (task.taskId === taskIdRef.current) {
          setPollingStatus(FetchingStatus.SUCCESS);
        }
      })
      .catch(() => {
        if (task.taskId === taskIdRef.current) {
          setPollingStatus(FetchingStatus.FAIL);
        }
      })
      .finally(() => {
        if (task.taskId === taskIdRef.current) {
          // @ts-ignore
          timerRef.current = window.setTimeout(loopPollingTask, task.interval);
        }
      });
  }, [task]);

  useEffect(() => {
    if (!autoStart) return undefined;
    loopPollingTask();
    return () => {
      taskIdRef.current = null;
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [loopPollingTask, autoStart]);

  const poll = useCallback(() => {
    setManualTaskId(uniqueId());
  }, []);

  return { pollingStatus, poll };
};
