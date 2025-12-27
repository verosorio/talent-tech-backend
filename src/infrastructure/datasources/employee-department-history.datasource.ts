import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/config/prisma.service';
import { EmployeeDepartmentHistoryRepository } from '@domain/repositories/employee-department-history.repository';
import { EmployeeDepartmentHistory } from '@domain/entities/employee-history.entity';

@Injectable()
export class EmployeeDepartmentHistoryDatasource implements EmployeeDepartmentHistoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(history: {
    employeeId: string;
    departmentId: string;
    fromDate?: Date;
    toDate?: Date;
  }): Promise<EmployeeDepartmentHistory> {
    const record = await this.prisma.employeeDepartmentHistory.create({
      data: {
        employeeId: history.employeeId,
        departmentId: history.departmentId,
        fromDate: history.fromDate || new Date(),
        toDate: history.toDate || null,
      },
    });

    return {
      id: record.id,
      employeeId: record.employeeId,
      departmentId: record.departmentId,
      fromDate: record.fromDate,
      toDate: record.toDate,
    };
  }

  async findByEmployee(employeeId: string): Promise<EmployeeDepartmentHistory[]> {
    const records = await this.prisma.employeeDepartmentHistory.findMany({
      where: { employeeId },
      orderBy: { fromDate: 'desc' },
    });

    return records.map(record => ({
      id: record.id,
      employeeId: record.employeeId,
      departmentId: record.departmentId,
      fromDate: record.fromDate,
      toDate: record.toDate,
    }));
  }

  async updateToDate(historyId: string, toDate: Date): Promise<EmployeeDepartmentHistory> {
    const record = await this.prisma.employeeDepartmentHistory.update({
      where: { id: historyId },
      data: { toDate },
    });

    return {
      id: record.id,
      employeeId: record.employeeId,
      departmentId: record.departmentId,
      fromDate: record.fromDate,
      toDate: record.toDate,
    };
  }
}
