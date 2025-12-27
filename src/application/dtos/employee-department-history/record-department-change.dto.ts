import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class RecordDepartmentChangeDto {
  @ApiProperty({ description: 'ID del departamento al que se asigna el empleado' })
  @IsString({ message: 'El ID del departamento debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El ID del departamento es obligatorio' })
  departmentId: string;
}
