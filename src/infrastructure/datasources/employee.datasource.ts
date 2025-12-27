import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '@domain/repositories/employee.repository';
import { PrismaService } from '@infrastructure/config/prisma.service';
import { Employee } from '@domain/entities/employee.entity';
import { CreateEmployeeDto } from '@application/dtos/employees/create-employee.dto';
@Injectable()
export class EmployeeDatasource implements EmployeeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: CreateEmployeeDto & { companyId: string },
  ): Promise<Employee> {
    const employee = await this.prisma.employee.create({
      data: {
        companyId: data.companyId,
        departmentId: data.departmentId || null,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        isActive: data.isActive ?? true,
        hiredAt: new Date(data.hiredAt),
      },
      include: { department: true },
    });

    return {
      id: employee.id,
      companyId: employee.companyId,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      isActive: employee.isActive,
      hiredAt: employee.hiredAt,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt,
      deletedAt: employee.deletedAt,
      department: employee.department
        ? {
            id: employee.department.id,
            companyId: employee.department.companyId,
            name: employee.department.name,
            description: employee.department.description,
            createdAt: employee.department.createdAt,
            updatedAt: employee.department.updatedAt,
            deletedAt: employee.department.deletedAt,
          }
        : null,
    };
  }

  async existsByEmail(companyId: string, email: string): Promise<boolean> {
    const count = await this.prisma.employee.count({
      where: { companyId, email, deletedAt: null },
    });
    return count > 0;
  }

  async findAll(
    companyId: string,
    pagination: { page: number; limit: number },
    filters?: {
      departmentId?: string;
      isActive?: boolean;
      hiredFrom?: Date;
      hiredTo?: Date;
    },
  ): Promise<{ data: Employee[]; total: number }> {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const where: any = {
      companyId,
      deletedAt: null,
    };

    if (filters?.departmentId) {
      where.departmentId = filters.departmentId;
    }

    if (filters?.isActive !== undefined) {
      where.isActive = filters.isActive;
    }

    if (filters?.hiredFrom || filters?.hiredTo) {
      where.hiredAt = {};
      if (filters.hiredFrom) where.hiredAt.gte = filters.hiredFrom;
      if (filters.hiredTo) where.hiredAt.lte = filters.hiredTo;
    }

    const [employees, total] = await this.prisma.$transaction([
      this.prisma.employee.findMany({
        where,
        skip,
        take: limit,
        include: { department: true },
        orderBy: { createdAt: 'asc' },
      }),
      this.prisma.employee.count({
        where,
      }),
    ]);

    const data: Employee[] = employees.map((emp) => ({
      id: emp.id,
      companyId: emp.companyId,
      firstName: emp.firstName,
      lastName: emp.lastName,
      email: emp.email,
      isActive: emp.isActive,
      hiredAt: emp.hiredAt,
      createdAt: emp.createdAt,
      updatedAt: emp.updatedAt,
      deletedAt: emp.deletedAt,
      department: emp.department
        ? {
            id: emp.department.id,
            companyId: emp.department.companyId,
            name: emp.department.name,
            description: emp.department.description,
            createdAt: emp.department.createdAt,
            updatedAt: emp.department.updatedAt,
            deletedAt: emp.department.deletedAt,
          }
        : null,
    }));

    return { data, total };
  }

  async findById(companyId: string, id: string): Promise<Employee | null> {
    const employee = await this.prisma.employee.findFirst({
      where: { id, companyId, deletedAt: null },
      include: { department: true },
    });
    if (!employee) return null;

    return {
      ...employee,
      department: employee.department
        ? {
            id: employee.department.id,
            companyId: employee.department.companyId,
            name: employee.department.name,
            description: employee.department.description,
            createdAt: employee.department.createdAt,
            updatedAt: employee.department.updatedAt,
            deletedAt: employee.department.deletedAt,
          }
        : null,
    };
  }

  async update(
    companyId: string,
    id: string,
    data: Partial<CreateEmployeeDto>,
  ): Promise<Employee> {
    const employee = await this.prisma.employee.update({
      where: { id },
      data,
      include: { department: true },
    });
    return {
      ...employee,
      department: employee.department
        ? {
            id: employee.department.id,
            companyId: employee.department.companyId,
            name: employee.department.name,
            description: employee.department.description,
            createdAt: employee.department.createdAt,
            updatedAt: employee.department.updatedAt,
            deletedAt: employee.department.deletedAt,
          }
        : null,
    };
  }

  async delete(companyId: string, id: string): Promise<void> {
    await this.prisma.employee.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
