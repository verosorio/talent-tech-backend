import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsBoolean, IsDate } from 'class-validator';

export class BulkEmployeeDto {
  @ApiProperty({ description: 'Nombre del empleado' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  firstName: string;

  @ApiProperty({ description: 'Apellido del empleado' })
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  lastName: string;

  @ApiProperty({ description: 'Correo electrónico del empleado' })
  @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
  email: string;

  @ApiPropertyOptional({ description: 'Nombre del departamento del empleado' })
  @IsOptional()
  @IsString({ message: 'El nombre del departamento debe ser una cadena de texto' })
  departmentName?: string;

  @ApiPropertyOptional({ description: 'Indica si el empleado está activo' })
  @IsOptional()
  @IsBoolean({ message: 'isActive debe ser verdadero o falso' })
  isActive?: boolean;

  @ApiProperty({ description: 'Fecha de contratación del empleado', type: String, format: 'date-time' })
  @IsDate({ message: 'hiredAt debe ser una fecha válida' })
  hiredAt: Date;
}
