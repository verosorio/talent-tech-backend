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
    return this.createEmployeeService.execute(companyId, dto);
  }
}
