import { Injectable } from '@nestjs/common';
import { RegisterCompanyDto } from '@application/dtos/auth/register-company.dto';
import { RegisterCompanyService } from '@application/services/auth/register-company.service';
import { RegisterCompanyResponseDto } from '@application/dtos/auth/register-company-response.dto';

@Injectable()
export class RegisterCompanyUseCase {
  constructor(
    private readonly registerCompanyService: RegisterCompanyService,
  ) {}

  async execute(
    dto: RegisterCompanyDto,
  ): Promise<RegisterCompanyResponseDto> {
    return this.registerCompanyService.execute(dto);
  }
}
