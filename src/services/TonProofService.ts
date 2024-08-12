import { Account, ConnectAdditionalRequest, TonProofItemReplySuccess } from '@tonconnect/ui-react';

import { configs } from '@/configs';
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY, PROOF_PAYLOAD_REQUEST_INTERVAL_MS } from '@/consts';
import { Maybe } from '@/types';

export class TonProofService {
  private accessTokenLocalStorageKey = ACCESS_TOKEN_LOCAL_STORAGE_KEY;

  private host = configs.endpoints.SERVICE_BASE_API;

  public accessToken: Maybe<string> = null;

  public readonly refreshIntervalMs = PROOF_PAYLOAD_REQUEST_INTERVAL_MS;

  constructor() {
    this.accessToken = localStorage.getItem(this.accessTokenLocalStorageKey);

    if (!this.accessToken) {
      this.generatePayload();
    }
  }

  async generatePayload(): Promise<ConnectAdditionalRequest | null> {
    try {
      const response = await (
        await fetch(`${this.host}/api/generate_payload`, {
          method: 'POST'
        })
      ).json();
      return {
        tonProof: response.payload as string
      };
    } catch {
      return null;
    }
  }

  async checkProof(proof: TonProofItemReplySuccess['proof'], account: Account): Promise<void> {
    try {
      const reqBody = {
        address: account.address,
        network: account.chain,
        public_key: account.publicKey,
        proof: {
          ...proof,
          state_init: account.walletStateInit
        }
      };

      const response = await (
        await fetch(`${this.host}/api/check_proof`, {
          method: 'POST',
          body: JSON.stringify(reqBody)
        })
      ).json();

      if (response?.token) {
        localStorage.setItem(this.accessTokenLocalStorageKey, response.token);
        this.accessToken = response.token;
      }
    } catch (e) {
      console.error('checkProof error:', e);
    }
  }

  async getAccountInfo(_account: Account) {
    const response = await (
      await fetch(`${this.host}/api/get_account_info`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        }
      })
    ).json();

    return response as {};
  }

  reset() {
    this.accessToken = null;
    localStorage.removeItem(this.accessTokenLocalStorageKey);
    this.generatePayload();
  }
}
