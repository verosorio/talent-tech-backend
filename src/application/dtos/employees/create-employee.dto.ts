import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsUUID,
  IsNotEmpty,
} from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ description: 'Nombre del empleado' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  firstName: string;

  @ApiProperty({ description: 'Apellido del empleado' })
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  lastName: string;

  @ApiProperty({ description: 'Correo electrónico del empleado' })
  @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  email: string;

  @ApiPropertyOptional({
    description: 'ID del departamento al que pertenece el empleado',
    type: String,
    format: 'uuid',
  })
  @IsUUID('4', { message: 'El ID del departamento debe ser un UUID válido' })
  @IsOptional()
  departmentId?: string | null;

  @ApiPropertyOptional({ description: 'Indica si el empleado está activo' })
  @IsOptional()
  @IsBoolean({ message: 'isActive debe ser verdadero o falso' })
  isActive?: boolean;

  @ApiProperty({
    description: 'Fecha de contratación del empleado',
    type: String,
    format: 'date-time',
  })
  @IsDateString(
    {},
    { message: 'hiredAt debe ser una fecha válida en formato ISO' },
  )
  @IsNotEmpty({ message: 'La fecha de contratación es obligatoria' })
  hiredAt: string;
}
