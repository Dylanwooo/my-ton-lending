import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

export interface APIResponse<T> {
  code: number;
  message: string;
  data: T;
}

export const getFetcher = async <T>(url: string, configs?: AxiosRequestConfig) => {
  const { data } = await axios.get<APIResponse<T>>(url, { ...configs });
  return data;
};

export const postFetcher = async <T, A>(
  url: string,
  params?: { arg?: A; headers?: AxiosRequestHeaders }
) => {
  const { arg, headers } = params ?? {};
  const { data } = await axios.post<APIResponse<T>>(url, arg, { headers, withCredentials: true });
  return data;
};

export const deleteFetcher = async <T>(url: string, params?: AxiosRequestConfig) => {
  const { data } = await axios.delete<APIResponse<T>>(url, params);
  return data;
};
