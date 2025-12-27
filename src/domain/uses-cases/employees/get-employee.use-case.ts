import { Injectable } from '@nestjs/common';
import { GetEmployeeService } from '@application/services/employees/get-employee.service';
import { ResponseEmployeeDto } from '@application/dtos/employees/response-employee.dto';

@Injectable()
export class GetEmployeeUseCase {
  constructor(private readonly getEmployeeService: GetEmployeeService) {}

  async execute(companyId: string, id: string): Promise<ResponseEmployeeDto> {
    const employee = await this.getEmployeeService.execute(companyId, id);
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
