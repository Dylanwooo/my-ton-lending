export enum Environment {
  testnet = 'testnet',
  prod = 'production'
}

export const env = (process.env.NODE_ENV ?? Environment.testnet) as Environment;
