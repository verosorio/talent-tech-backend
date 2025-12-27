import { Injectable } from '@nestjs/common';
import { ListEmployeesService } from '@application/services/employees/list-employees.service';
import { PaginationDto } from '@application/dtos/pagination/pagination.dto';
import { PaginatedResponseDto } from '@application/dtos/pagination/paginated-response.dto';
import { ResponseEmployeeDto } from '@application/dtos/employees/response-employee.dto';

@Injectable()
export class ListEmployeesUseCase {
  constructor(private readonly listEmployeesService: ListEmployeesService) {}

  async execute(
    companyId: string,
    pagination: PaginationDto,
    filters?: {
      departmentId?: string;
      isActive?: boolean;
      hiredFrom?: Date;
      hiredTo?: Date;
    },
  ): Promise<PaginatedResponseDto<ResponseEmployeeDto>> {
    const { data, total } = await this.listEmployeesService.execute(
      companyId,
      pagination,
      filters,
    );

    const response = data.map((emp) => ({
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
    }));

    return new PaginatedResponseDto(
      response,
      total,
      pagination.page,
      pagination.limit,
    );
  }
}
