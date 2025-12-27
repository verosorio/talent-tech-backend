import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsUUID,
} from 'class-validator';

export class UpdateEmployeeDto {
  @ApiPropertyOptional({ description: 'Nombre del empleado' })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  firstName?: string;

  @ApiPropertyOptional({ description: 'Apellido del empleado' })
  @IsOptional()
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  lastName?: string;

  @ApiPropertyOptional({ description: 'Correo electrónico del empleado' })
  @IsOptional()
  @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
  email?: string;

  @ApiPropertyOptional({ description: 'ID del departamento al que pertenece el empleado', type: String, format: 'uuid' })
  @IsOptional()
  @IsUUID('4', { message: 'El ID del departamento debe ser un UUID válido' })
  departmentId?: string | null;

  @ApiPropertyOptional({ description: 'Indica si el empleado está activo' })
  @IsOptional()
  @IsBoolean({ message: 'isActive debe ser verdadero o falso' })
  isActive?: boolean;

  @ApiPropertyOptional({ description: 'Fecha de contratación del empleado', type: String, format: 'date-time' })
  @IsOptional()
  @IsDateString({}, { message: 'hiredAt debe ser una fecha válida en formato ISO' })
  hiredAt?: string;
}
