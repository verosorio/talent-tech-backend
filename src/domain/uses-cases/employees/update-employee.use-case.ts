import { Injectable } from '@nestjs/common';
import { UpdateEmployeeService } from '@application/services/employees/update-employee.service';
import { UpdateEmployeeDto } from '@application/dtos/employees/update-employee.dto';
import { ResponseEmployeeDto } from '@application/dtos/employees/response-employee.dto';

@Injectable()
export class UpdateEmployeeUseCase {
  constructor(private readonly updateEmployeeService: UpdateEmployeeService) {}

  async execute(
    companyId: string,
    id: string,
    dto: UpdateEmployeeDto,
  ): Promise<ResponseEmployeeDto> {
    const employee = await this.updateEmployeeService.execute(
      companyId,
      id,
      dto,
    );
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
