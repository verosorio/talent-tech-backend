import { Controller, Post, Body } from '@nestjs/common';
import { LoginCompanyDto } from '@application/dtos/login-company.dto';
import { LoginCompanyUseCase } from '@domain/uses-cases/auth/login-company.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginCompanyUseCase: LoginCompanyUseCase,
  ) {}

  @Post('login')
  async login(@Body() dto: LoginCompanyDto) {
    return this.loginCompanyUseCase.execute(dto);
  }
}
