import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from '@application/dtos/employees/create-employee.dto';
import { CreateEmployeeService } from '@application/services/employees/create-employee.service';
import { ResponseEmployeeDto } from '@application/dtos/employees/response-employee.dto';

@Injectable()
export class CreateEmployeeUseCase {
  constructor(private readonly createEmployeeService: CreateEmployeeService) {}

  async execute(
    companyId: string,
    dto: CreateEmployeeDto,
  ): Promise<ResponseEmployeeDto> {
    const employee = await this.createEmployeeService.execute(companyId, dto);

    return {
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      isActive: employee.isActive,
      hiredAt: employee.hiredAt,
      department: employee.department
        ? {
            id: employee.department.id,
            name: employee.department.name,
            description: employee.department.description ?? null,
          }
        : null,
    };
  }
}
