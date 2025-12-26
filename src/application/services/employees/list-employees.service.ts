import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '@domain/repositories/employee.repository';
import { Employee } from '@domain/entities/employee.entity';
import { PaginationDto } from '@application/dtos/pagination/pagination.dto';

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
  ):  Promise<{ data: Employee[]; total: number }> {
    return this.employeeRepository.findAll(companyId, pagination, filters);
  }
}
