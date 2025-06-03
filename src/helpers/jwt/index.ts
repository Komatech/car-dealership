import * as jwt from 'jsonwebtoken';
import { inject, injectable } from 'inversify';
import { OPTIONS_TOKENS } from '@app/container/tokens';

/**
 * Sign data as a JWT token
 * @param secret secret for signing
 * @param timeout how long before the JWT expires. This is intentionally required
 * @param data data to encode
 * @returns signed JWT token
 */
export function encode(
  secret: jwt.Secret,
  timeout: string | number,
  data: any,
): string {
  return jwt.sign(
    { 'urn:custom:claim': data },
    secret,
    {
      algorithm: 'HS256',
      expiresIn: timeout as jwt.SignOptions['expiresIn'],
    }
  );
}

/**
 * Verifies and decodes tokens signed using `encode`.
 * @param secret secret used to sign
 * @param token token to be verified
 * @returns the claims
 */
export function decode<T = any>(secret: jwt.Secret, token: string): T {
  const payload = jwt.verify(token, secret) as jwt.JwtPayload;
  return payload['urn:custom:claim'] as T;
}

export interface JwtOptions {
  signOptions?: jwt.SignOptions;
  secret?: string | Buffer;
  publicKey?: string | Buffer;
  privateKey?: jwt.Secret;
  verifyOptions?: jwt.VerifyOptions;
}

export interface JwtSignOptions extends jwt.SignOptions {
  secret?: string | Buffer;
  privateKey?: jwt.Secret;
}

export interface JwtVerifyOptions extends jwt.VerifyOptions {
  secret?: string | Buffer;
  publicKey?: string | Buffer;
}

export type GetSecretKeyResult = string | Buffer | jwt.Secret;

@injectable()
export class Jwt {
  constructor(
    @inject(OPTIONS_TOKENS.JwtOptions) private readonly options: JwtOptions,
  ) {}

  sign(
    payload: string,
    options?: Omit<JwtSignOptions, keyof jwt.SignOptions>,
  ): string;
  sign(payload: Buffer | object, options: JwtSignOptions): string;
  sign(payload: string | Buffer | object, options: JwtSignOptions): string {
    const signOptions = this.mergeJwtOptions(
      { ...options },
      'signOptions',
    ) as jwt.SignOptions;

    const secret = this.getSecretKey(options, 'privateKey');

    const allowedSignOptKeys = ['secret', 'privateKey'];

    const signOptKeys = Object.keys(signOptions);
    if (
      typeof payload === 'string' &&
      signOptKeys.some((k) => !allowedSignOptKeys.includes(k))
    ) {
      throw new Error(
        'Payload as string is not allowed with the following sign options: ' +
          signOptKeys.join(', '),
      );
    }

    return jwt.sign(payload, secret, signOptions);
  }

  signAsync(
    payload: string,
    options?: Omit<JwtSignOptions, keyof jwt.SignOptions>,
  ): Promise<string>;
  signAsync(
    payload: Buffer | object,
    options: JwtSignOptions,
  ): Promise<string>;
  signAsync(
    payload: string | Buffer | object,
    options: JwtSignOptions,
  ): Promise<string> {
    const signOptions = this.mergeJwtOptions(
      { ...options },
      'signOptions',
    ) as jwt.SignOptions;
    const secret = this.getSecretKey(options, 'privateKey');

    const allowedSignOptKeys = ['secret', 'privateKey'];
    const signOptKeys = Object.keys(signOptions);
    if (
      typeof payload === 'string' &&
      signOptKeys.some((k) => !allowedSignOptKeys.includes(k))
    ) {
      throw new Error(
        'Payload as string is not allowed with the following sign options: ' +
          signOptKeys.join(', '),
      );
    }

    return new Promise((resolve, reject) =>
      Promise.resolve()
        .then(() => secret)
        .then((scrt: GetSecretKeyResult) => {
          jwt.sign(payload, scrt, signOptions, (err, encoded) =>
            err ? reject(err) : resolve(encoded!),
          );
        }),
    );
  }

  verify<T extends object = any>(token: string, options: JwtVerifyOptions): T {
    const verifyOptions = this.mergeJwtOptions({ ...options }, 'verifyOptions');

    const secret = this.getSecretKey(options, 'publicKey');

    return jwt.verify(token, secret, verifyOptions) as T;
  }

  verifyAsync<T extends object = any>(
    token: string,
    options: JwtVerifyOptions,
  ): Promise<T> {
    const verifyOptions = this.mergeJwtOptions({ ...options }, 'verifyOptions');
    const secret = this.getSecretKey(options, 'publicKey');

    return new Promise((resolve, reject) =>
      Promise.resolve()
        .then(() => secret)
        .then((scrt: GetSecretKeyResult) => {
          jwt.verify(token, scrt, verifyOptions, (err, decoded) =>
            err ? reject(err) : resolve(decoded as T),
          );
        })
        .catch(reject),
    ) as Promise<T>;
  }

  decode<T = any>(token: string, options?: jwt.DecodeOptions): T {
    return jwt.decode(token, options) as T;
  }

  private mergeJwtOptions(
    options: JwtVerifyOptions | JwtSignOptions,
    key: 'verifyOptions' | 'signOptions',
  ): jwt.VerifyOptions | jwt.SignOptions {
    delete options.secret;
    if (key === 'signOptions') {
      delete (options as JwtSignOptions).privateKey;
    } else {
      delete (options as JwtVerifyOptions).publicKey;
    }
    return options
      ? {
          ...(this.options[key] || {}),
          ...options,
        }
      : (this.options[key] || {});
  }

  private getSecretKey(
    options: JwtVerifyOptions | JwtSignOptions,
    key: 'publicKey' | 'privateKey',
  ): GetSecretKeyResult {
    const secret =
      options?.secret ||
      this.options?.secret ||
      (key === 'privateKey'
        ? (options as JwtSignOptions)?.privateKey || this.options.privateKey
        : (options as JwtVerifyOptions)?.publicKey || this.options.publicKey) ||
      this.options[key];

    if (!secret) {
      throw new Error(`JWT ${key} is not defined`);
    }

    return secret;
  }
}
