import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/config/prisma.service';
import { DepartmentRepository } from '@domain/repositories/department.repository';
import { Department } from '@domain/entities/department.entity';

@Injectable()
export class DepartmentDatasource implements DepartmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    companyId: string;
    name: string;
    description?: string;
  }): Promise<Department> {
    return this.prisma.department.create({ data });
  }

  async findAllByCompany(
    companyId: string,
    pagination: { page: number; limit: number },
  ): Promise<{ data: Department[]; total: number }> {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.department.findMany({
        where: {
          companyId,
          deletedAt: null,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'asc' },
      }),
      this.prisma.department.count({
        where: {
          companyId,
          deletedAt: null,
        },
      }),
    ]);

    return { data, total };
  }

  async findById(id: string): Promise<Department | null> {
    return this.prisma.department.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async update(
    id: string,
    data: {
      name?: string;
      description?: string | null;
    },
  ): Promise<Department> {
    return this.prisma.department.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: string): Promise<void> {
    await this.prisma.department.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async existsByName(companyId: string, name: string): Promise<boolean> {
    const count = await this.prisma.department.count({
      where: {
        companyId,
        name,
        deletedAt: null,
      },
    });

    return count > 0;
  }
}
