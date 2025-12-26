import { CreateEmployeeDto } from '@application/dtos/employees/create-employee.dto';
import { PaginationDto } from '@application/dtos/pagination/pagination.dto';
import { Employee } from '@domain/entities/employee.entity';

export abstract class EmployeeRepository {
  abstract create(
    employee: CreateEmployeeDto & { companyId: string },
  ): Promise<Employee>;
  abstract existsByEmail(companyId: string, email: string): Promise<boolean>;
  abstract findAll(
    companyId: string,
    pagination: PaginationDto,
    filters?: {
      departmentId?: string;
      isActive?: boolean;
      hiredFrom?: Date;
      hiredTo?: Date;
    },
  ): Promise<{ data: Employee[]; total: number }>;

  abstract findById(companyId: string, id: string): Promise<Employee | null>;
  abstract update(
    companyId: string,
    id: string,
    data: Partial<CreateEmployeeDto>,
  ): Promise<Employee>;
  abstract delete(companyId: string, id: string): Promise<void>;
}
