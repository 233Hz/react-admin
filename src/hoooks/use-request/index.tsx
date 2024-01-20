import { Response } from '@/utils/request';
import { useCallback, useEffect, useRef, useState } from 'react';

interface RequestOptions {
  manual?: boolean;
  defaultParams?: any[];
}

interface RequestResponse<T> {
  error: boolean | undefined;
  data: T | undefined;
  loading: boolean;
  run(...args: any): void;
  runAsync(...args: any): Response<T>;
  refresh(): void;
}

type ServiceMethod<T> = (...args: any) => Response<T>;

export function useRequest<T>(serviceMethod: ServiceMethod<T>, options?: RequestOptions): RequestResponse<T> {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<boolean>();

  const paramsRef = useRef<any[]>([]);

  const resolveData = useCallback(async () => {
    setLoading(true);
    const [error, responseData] = await serviceMethod(...(options?.defaultParams || []));
    setLoading(false);
    setData(responseData);
    setError(error);
  }, [serviceMethod, options]);

  const runAsync = useCallback(
    async (...params: any) => {
      paramsRef.current = params;
      setLoading(true);
      const res = await serviceMethod(...params);
      const [error, responseData] = res;
      setLoading(false);
      setData(responseData);
      setError(error);
      return res;
    },
    [serviceMethod]
  );

  const run = useCallback(
    async (...params: any) => {
      await runAsync(params);
    },
    [runAsync]
  );

  const refresh = useCallback(() => {
    runAsync(paramsRef.current);
  }, [runAsync]);

  useEffect(() => {
    if (!options?.manual) {
      resolveData();
    }
  }, [options, resolveData]);

  return {
    loading,
    data,
    error,
    run,
    runAsync,
    refresh,
  };
}
