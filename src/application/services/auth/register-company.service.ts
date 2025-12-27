import {
  Injectable,
  ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CompanyRepository } from '@domain/repositories/company.repository';
import { RegisterCompanyDto } from '@application/dtos/auth/register-company.dto';
import { RegisterCompanyResponseDto } from '@application/dtos/auth/register-company-response.dto';

@Injectable()
export class RegisterCompanyService {
  constructor(
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(
    dto: RegisterCompanyDto,
  ): Promise<RegisterCompanyResponseDto> {

    const existing = await this.companyRepository.findByEmail(dto.email);

    if (existing && !existing.deletedAt) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const company = await this.companyRepository.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    });

    return {
      id: company.id,
      name: company.name,
      email: company.email,
    };
  }
}
