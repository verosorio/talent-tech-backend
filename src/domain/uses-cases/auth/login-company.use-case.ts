import { Injectable } from '@nestjs/common';
import { LoginCompanyService } from '@application/services/auth/login-company.service';
import { LoginResponseDto } from '@application/dtos/auth/login-company-response.dto';
import { LoginCompanyDto } from '@application/dtos/auth/login-company.dto';

@Injectable()
export class LoginCompanyUseCase {
  constructor(private readonly loginCompanyService: LoginCompanyService) {}

 async execute(dto: LoginCompanyDto): Promise<LoginResponseDto> {
  return this.loginCompanyService.execute(dto);
}

}
