import { Environment, env } from './env';

export const endpoints = {
  SERVICE_BASE_API: {
    [Environment.testnet]: 'https://ton-lending-dev/api',
    [Environment.prod]: 'https://ton-lending/api'
  }[env]
};
