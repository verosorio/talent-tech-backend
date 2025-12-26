import { Controller, Post, Body } from '@nestjs/common';
import { LoginCompanyDto } from '@application/dtos/auth/login-company.dto';
import { LoginCompanyUseCase } from '@domain/uses-cases/auth/login-company.use-case';
import { LoginResponseDto } from '@application/dtos/auth/login-company-response.dto';
import { RegisterCompanyDto } from '@application/dtos/auth/register-company.dto';
import { RegisterCompanyResponseDto } from '@application/dtos/auth/register-company-response.dto';
import { RegisterCompanyUseCase } from '@domain/uses-cases/auth/register-company.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginCompanyUseCase: LoginCompanyUseCase,
    private readonly registerCompanyUseCase: RegisterCompanyUseCase,
  ) {}

  @Post('login')
  async login(@Body() dto: LoginCompanyDto): Promise<LoginResponseDto> {
    return this.loginCompanyUseCase.execute(dto);
  }

  @Post('register')
  async register(
    @Body() dto: RegisterCompanyDto,
  ): Promise<RegisterCompanyResponseDto> {
    return this.registerCompanyUseCase.execute(dto);
  }
}
