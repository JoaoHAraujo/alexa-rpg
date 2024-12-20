import { getEnv } from '@src/constants';
import { provideSingleton } from '@src/utils/provide-singleton';
import { createHmac } from 'crypto';

@provideSingleton(CryptoAdapter)
export class CryptoAdapter {
  private readonly cryptoKey: string;

  constructor() {
    this.cryptoKey = getEnv().cryptoKey;
  }

  generateHash(value: string): string {
    return createHmac('sha256', this.cryptoKey).update(value).digest('hex');
  }

  validateHash(value: string, storedHash: string): boolean {
    const inputHash = createHmac('sha256', this.cryptoKey).update(value).digest('hex');

    return inputHash === storedHash;
  }
}
