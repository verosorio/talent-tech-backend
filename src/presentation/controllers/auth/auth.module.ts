import { Module } from '@nestjs/common';
import { LoginCompanyService } from '@application/services/auth/login-company.service';
import { CompanyRepository } from '@domain/repositories/company.repository';
import { LoginCompanyUseCase } from '@domain/uses-cases/auth/login-company.use-case';
import { CompanyDatasource } from '@infrastructure/datasources/prisma-company.datasource';
import { AuthController } from './auth.controller';
import { NestJwtAdapter } from '@infrastructure/services';
import { PrismaModule } from '@infrastructure/config';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'chronosoft-secret-key-2025',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [
    LoginCompanyUseCase,
    LoginCompanyService,
    {
      provide: CompanyRepository,
      useClass: CompanyDatasource,
    },
    { provide: 'JwtService', useClass: NestJwtAdapter },
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
