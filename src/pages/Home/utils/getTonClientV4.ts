import { TonClient4 } from '@ton/ton';
import { getHttpV4Endpoint, Network } from '@orbs-network/ton-access';

export const getTonClientV4 = async (network: Network) => {
  const endpoint = await getHttpV4Endpoint({
    network
  });

  return new TonClient4({
    endpoint
  });
};
