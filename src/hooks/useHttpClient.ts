import { HttpClient } from 'tonapi-sdk-js';

import { TON_API_TOKEN } from '@/utils';
import { useTonConnect } from '@/hooks/useTonConnect';

// return the rest api client
export const useHttpClient = () => {
  const { isMainnet } = useTonConnect();

  const httpClient = new HttpClient({
    baseUrl: isMainnet ? 'https://tonapi.io' : 'https://testnet.tonapi.io',
    baseApiParams: {
      headers: {
        Authorization: `Bearer ${TON_API_TOKEN}`,
        'Content-type': 'application/json'
      }
    }
  });

  return httpClient;
};
