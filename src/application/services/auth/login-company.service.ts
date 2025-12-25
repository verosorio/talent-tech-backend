import {
  Injectable,
  /*   ConflictException, */
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
/* import { Company } from '../../../domain/entities/company.entity';
import { RegisterCompanyDto } from 'src/application/dtos/register-company.dto'; */
import { CompanyRepository } from '@domain/repositories/company.repository';
import { LoginCompanyDto } from '@application/dtos/login-company.dto';
import type { JwtService } from '@domain/interfaces/jwt-service.interface';
import { LoginResponseDto } from '@application/dtos/login-company-response.dto';

@Injectable()
export class LoginCompanyService {
  constructor(
    private readonly companyRepository: CompanyRepository,
    @Inject('JwtService') private readonly jwtService: JwtService,
  ) {}

  /* async register(dto: RegisterCompanyDto) {
    const existing = await this.companyRepository.findByEmail(dto.email);
    if (existing) throw new ConflictException('Email already registered');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const company = {
      id: '', // Prisma generará UUID
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    } as Company;

    const savedCompany = await this.companyRepository.save(company);

    return {
      id: savedCompany.id,
      email: savedCompany.email,
      name: savedCompany.name,
    };
  } */

  async execute(dto: LoginCompanyDto): Promise<LoginResponseDto> {
    const company = await this.companyRepository.findByEmail(dto.email);

    if (!company || company.deletedAt) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(dto.password, company.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { uid: company.id };
    const accessToken = this.jwtService.signAccessToken(payload);

    return { access_token: accessToken };
  }
}
