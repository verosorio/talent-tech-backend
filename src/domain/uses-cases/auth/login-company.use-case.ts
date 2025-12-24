import { Injectable } from '@nestjs/common';
import { LoginCompanyDto } from '@application/dtos/login-company.dto';
import { LoginCompanyService } from '@application/services/auth/login-company.service';

@Injectable()
export class LoginCompanyUseCase {
  constructor(private readonly loginCompanyService: LoginCompanyService) {}

  async execute(dto: LoginCompanyDto): Promise<{ access_token: string }> {
    return this.loginCompanyService.login(dto);
  }
}
