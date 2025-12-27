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
import { LoginCompanyDto } from '@application/dtos/auth/login-company.dto';
import type { JwtService } from '@domain/interfaces/jwt-service.interface';
import { LoginResponseDto } from '@application/dtos/auth/login-company-response.dto';

@Injectable()
export class LoginCompanyService {
  constructor(
    private readonly companyRepository: CompanyRepository,
    @Inject('JwtService') private readonly jwtService: JwtService,
  ) {}

  async execute(dto: LoginCompanyDto): Promise<LoginResponseDto> {
    const company = await this.companyRepository.findByEmail(dto.email);

    if (!company || company.deletedAt) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordMatch = await bcrypt.compare(dto.password, company.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { uid: company.id };
    const accessToken = this.jwtService.signAccessToken(payload);

    return { access_token: accessToken };
  }
}
