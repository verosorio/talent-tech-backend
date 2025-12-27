import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EmployeeDepartmentHistory } from '@domain/entities/employee-history.entity';

export class EmployeeHistoryResponseDto {
  @ApiProperty({ description: 'ID único del historial del empleado' })
  id: string;

  @ApiProperty({ description: 'ID del empleado' })
  employeeId: string;

  @ApiProperty({ description: 'ID del departamento' })
  departmentId: string;

  @ApiProperty({ description: 'Fecha de inicio en el departamento', type: String, format: 'date-time' })
  fromDate: Date;

  @ApiPropertyOptional({ description: 'Fecha de finalización en el departamento', type: String, format: 'date-time' })
  toDate?: Date;

  constructor(entity: EmployeeDepartmentHistory) {
    this.id = entity.id;
    this.employeeId = entity.employeeId;
    this.departmentId = entity.departmentId;
    this.fromDate = entity.fromDate;
    this.toDate = entity.toDate ?? undefined;
  }
}
