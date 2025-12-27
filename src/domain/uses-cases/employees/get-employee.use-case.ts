import { Injectable } from '@nestjs/common';
import { GetEmployeeService } from '@application/services/employees/get-employee.service';
import { ResponseEmployeeDto } from '@application/dtos/employees/response-employee.dto';

@Injectable()
export class GetEmployeeUseCase {
  constructor(private readonly getEmployeeService: GetEmployeeService) {}

  async execute(companyId: string, id: string): Promise<ResponseEmployeeDto> {
    return this.getEmployeeService.execute(companyId, id);
  }
}
