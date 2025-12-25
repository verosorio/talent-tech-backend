import { Controller, Post, Body } from '@nestjs/common';
import { LoginCompanyDto } from '@application/dtos/login-company.dto';
import { LoginCompanyUseCase } from '@domain/uses-cases/auth/login-company.use-case';
import { LoginResponseDto } from '@application/dtos/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginCompanyUseCase: LoginCompanyUseCase) {}

  @Post('login')
  async login(@Body() dto: LoginCompanyDto): Promise<LoginResponseDto> {
    return this.loginCompanyUseCase.execute(dto);
  }
}
