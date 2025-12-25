import { Injectable } from '@nestjs/common';
import { LoginCompanyDto } from '@application/dtos/login-company.dto';
import { LoginCompanyService } from '@application/services/auth/login-company.service';
import { LoginResponseDto } from '@application/dtos/login-response.dto';

@Injectable()
export class LoginCompanyUseCase {
  constructor(private readonly loginCompanyService: LoginCompanyService) {}

 async execute(dto: LoginCompanyDto): Promise<LoginResponseDto> {
  return this.loginCompanyService.execute(dto);
}

}
