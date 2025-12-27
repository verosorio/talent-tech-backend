import { PaginationDto } from '@application/dtos/pagination/pagination.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsBoolean, IsUUID, IsDateString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class ListEmployeesQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'ID del departamento para filtrar empleados',
    type: String,
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID('4', { message: 'El ID del departamento debe ser un UUID válido' })
  departmentId?: string;

  @ApiPropertyOptional({
    description: 'Filtra si el empleado está activo o no',
  })
  @IsOptional()
  @IsBoolean({ message: 'isActive debe ser verdadero o falso' })
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return undefined;
  })
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Filtra empleados contratados a partir de esta fecha',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString(
    {},
    { message: 'hiredFrom debe ser una fecha válida en formato ISO' },
  )
  hiredFrom?: string;

  @ApiPropertyOptional({
    description: 'Filtra empleados contratados hasta esta fecha',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString(
    {},
    { message: 'hiredTo debe ser una fecha válida en formato ISO' },
  )
  hiredTo?: string;
}
