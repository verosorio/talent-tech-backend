import { CompanyRepository } from '@domain/repositories/company.repository';
import { Injectable } from '@nestjs/common';
import { Company } from '@domain/entities/company.entity';
import { PrismaService } from '@infrastructure/config/prisma.service';

@Injectable()
export class CompanyDatasource implements CompanyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Company | null> {
    const data = await this.prisma.company.findUnique({ where: { email } });
    if (!data) return null;

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    };
  }
}
