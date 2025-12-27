import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ResponseDepartmentDto } from '../departments/response-department.dto';

export class ResponseEmployeeDto {
  @ApiProperty({ description: 'ID único del empleado' })
  id: string;

  @ApiPropertyOptional({ description: 'Departamento al que pertenece el empleado', type: ResponseDepartmentDto, nullable: true })
  department: ResponseDepartmentDto | null;

  @ApiProperty({ description: 'Nombre del empleado' })
  firstName: string;

  @ApiProperty({ description: 'Apellido del empleado' })
  lastName: string;

  @ApiProperty({ description: 'Correo electrónico del empleado' })
  email: string;

  @ApiProperty({ description: 'Indica si el empleado está activo' })
  isActive: boolean;

  @ApiProperty({ description: 'Fecha de contratación del empleado', type: String, format: 'date-time' })
  hiredAt: Date;
}
