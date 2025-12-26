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
      department: employee.department || null,
      isActive: employee.isActive,
      hiredAt: employee.hiredAt,
    };
  }
}
