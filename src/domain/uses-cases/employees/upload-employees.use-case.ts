import { Injectable } from '@nestjs/common';
import { UploadEmployeesService } from '@application/services/employees/upload-employees.service';
import { BulkEmployeeDto } from '@application/dtos/employees/bulk/bulk-employee.dto';
import { BulkUploadResultDto } from '@application/dtos/employees/bulk/bulk-upload-result.dto';

@Injectable()
export class UploadEmployeesUseCase {
  constructor(private readonly uploadEmployeesService: UploadEmployeesService) {}

  async execute(
    companyId: string,
    employees: BulkEmployeeDto[]
  ): Promise<BulkUploadResultDto> {
    return this.uploadEmployeesService.execute(companyId, employees);
  }
}
