import { getEnv } from '@src/constants';
import { Auth } from '@src/domain/models';
import { provideSingleton } from '@src/utils/provide-singleton';
import { sign, verify } from 'jsonwebtoken';

@provideSingleton(JwtAdapter)
export class JwtAdapter {
  private jwtKey: string;
  private expiresIn: string;

  constructor() {
    const { jwt } = getEnv();
    this.jwtKey = jwt.jwtKey;
    this.expiresIn = jwt.expiresIn;
  }

  createToken(payload: Auth): string {
    const token = sign(payload, this.jwtKey, { expiresIn: this.expiresIn });

    return token;
  }

  verifyToken(token: string): Auth | null {
    try {
      const decoded = verify(token, this.jwtKey) as Auth;

      return decoded;
    } catch (error) {
      console.error('Invalid or expired token:', error);

      return null;
    }
  }
}
