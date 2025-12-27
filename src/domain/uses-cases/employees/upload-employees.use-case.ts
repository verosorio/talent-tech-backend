import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadEmployeesService } from '@application/services/employees/upload-employees.service';
import { BulkEmployeeDto } from '@application/dtos/employees/bulk/bulk-employee.dto';
import { BulkUploadResultDto } from '@application/dtos/employees/bulk/bulk-upload-result.dto';
import { parseEmployeeCsv } from '@infrastructure/utils/csv/employee-csv.parser';

@Injectable()
export class UploadEmployeesUseCase {
  constructor(private readonly service: UploadEmployeesService) {}

  async execute(companyId: string, buffer: Buffer): Promise<BulkUploadResultDto> {
    const parsed = parseEmployeeCsv(buffer);
    const sanitized: BulkEmployeeDto[] = parsed.map(row => {
      const firstName = row.firstName?.trim();
      const lastName = row.lastName?.trim();
      const email = row.email?.trim().toLowerCase();
      const departmentName = row.department?.trim();

      if (!firstName || !lastName) {
        throw new BadRequestException(
          `Faltan campos obligatorios para el empleado con email: ${email}`
        );
      }

      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        throw new BadRequestException(`Correo electrónico inválido: ${row.email}`);
      }

      const hiredAt = row.hiredAt ? new Date(row.hiredAt) : new Date();
      if (isNaN(hiredAt.getTime())) {
        throw new BadRequestException(`Fecha de contratación inválida: ${row.hiredAt}`);
      }

      const isActive =
        row.isActive === undefined
          ? true
          : row.isActive.toString().toLowerCase() === 'true';

      return {
        firstName,
        lastName,
        email,
        departmentName,
        hiredAt,
        isActive,
      };
    });

    return this.service.execute(companyId, sanitized);
  }
}


