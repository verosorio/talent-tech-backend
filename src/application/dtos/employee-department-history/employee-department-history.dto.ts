import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EmployeeDepartmentHistoryDto {
  @ApiProperty({ description: 'ID del empleado' })
  employeeId: string;

  @ApiProperty({ description: 'ID del departamento' })
  departmentId: string;

  @ApiProperty({ description: 'Fecha de inicio en el departamento', type: String, format: 'date-time' })
  fromDate: Date;

  @ApiPropertyOptional({ description: 'Fecha de finalización en el departamento', type: String, format: 'date-time' })
  toDate?: Date;
}
