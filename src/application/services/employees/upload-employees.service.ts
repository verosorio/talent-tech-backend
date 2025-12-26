import { Injectable, ConflictException } from '@nestjs/common';
import { EmployeeRepository } from '@domain/repositories/employee.repository';
import { DepartmentRepository } from '@domain/repositories/department.repository';
import { BulkEmployeeDto } from '@application/dtos/employees/bulk/bulk-employee.dto';
import { BulkUploadResultDto } from '@application/dtos/employees/bulk/bulk-upload-result.dto';

@Injectable()
export class UploadEmployeesService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly departmentRepository: DepartmentRepository
  ) {}

  async execute(
    companyId: string,
    employees: BulkEmployeeDto[]
  ): Promise<BulkUploadResultDto> {
    const result: BulkUploadResultDto = { success: [], failed: [] };

    for (const row of employees) {
      try {
        const exists = await this.employeeRepository.existsByEmail(
          companyId,
          row.email
        );
        if (exists) throw new ConflictException('Email already exists');

        let departmentId: string | undefined;
        if (row.departmentName) {
          const dept = await this.departmentRepository.findByName(
            companyId,
            row.departmentName
          );
          if (!dept) throw new Error(`Department ${row.departmentName} not found`);
          departmentId = dept.id;
        }

        await this.employeeRepository.create({
          companyId,
          firstName: row.firstName,
          lastName: row.lastName,
          email: row.email,
          departmentId: departmentId || null,
          isActive: row.isActive ?? true,
          hiredAt: row.hiredAt.toISOString()
        });

        result.success.push(row);
      } catch (error) {
        result.failed.push({ row, reason: error.message });
      }
    }

    return result;
  }
}
