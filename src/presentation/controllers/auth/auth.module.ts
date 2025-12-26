import { Module } from '@nestjs/common';
import { NestJwtAdapter } from '@infrastructure/services';
import { PrismaModule } from '@infrastructure/config';
import { JwtModule } from '@nestjs/jwt';
import { CompanyRepository } from '@domain/repositories/company.repository';
import { RegisterCompanyUseCase } from '@domain/uses-cases/auth/register-company.use-case';
import { LoginCompanyUseCase } from '@domain/uses-cases/auth/login-company.use-case';
import { RegisterCompanyService } from '@application/services/auth/register-company.service';
import { LoginCompanyService } from '@application/services/auth/login-company.service';
import { CompanyDatasource } from '@infrastructure/datasources/company.datasource';
import { AuthController } from './auth.controller';
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
    RegisterCompanyUseCase,
    RegisterCompanyService,
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
