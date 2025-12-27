import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '@domain/repositories/employee.repository';
import { PaginationDto } from '@application/dtos/pagination/pagination.dto';
import { ResponseEmployeeDto } from '@application/dtos/employees/response-employee.dto';

@Injectable()
export class ListEmployeesService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(
    companyId: string,
    pagination: PaginationDto,
    filters?: {
      departmentId?: string;
      isActive?: boolean;
      hiredFrom?: Date;
      hiredTo?: Date;
    },
  ): Promise<{ data: ResponseEmployeeDto[]; total: number }> {
    const { data, total } = await this.employeeRepository.findAll(
      companyId,
      pagination,
      filters,
    );

    return {
      total,
      data: data.map((emp) => ({
        id: emp.id,
        firstName: emp.firstName,
        lastName: emp.lastName,
        email: emp.email,
        isActive: emp.isActive,
        hiredAt: emp.hiredAt,
        department: emp.department
          ? {
              id: emp.department.id,
              name: emp.department.name,
              description: emp.department.description ?? null,
            }
          : null,
      })),
    };
  }
}
