import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { envs } from '../config/envs';
import type { StringValue } from 'ms';
import { JwtService } from '@domain/interfaces/jwt-service.interface';

@Injectable()
export class NestJwtAdapter implements JwtService {
  constructor(private readonly nestJwtService: NestJwtService) {}

  sign(payload: { uid: string }): string {
    return this.nestJwtService.sign(payload, {
      expiresIn: '24h' as StringValue,
    });
  }

  signAccessToken(payload: { uid: string }): string {
    return this.nestJwtService.sign(payload, {
      expiresIn:
        (envs.JWT_EXPIRES_IN as unknown as StringValue | number | undefined) ||
        ('15m' as StringValue),
      secret: envs.JWT_SECRET,
    });
  }

  signRefreshToken(payload: { uid: string }): string {
    return this.nestJwtService.sign(payload, {
      expiresIn: '7d' as StringValue,
      secret:
        process.env.JWT_REFRESH_SECRET ||
        process.env.JWT_SECRET ||
        'chronosoft-secret-key-2025',
    });
  }
}
