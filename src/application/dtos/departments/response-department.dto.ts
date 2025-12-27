import { ApiProperty } from '@nestjs/swagger';

export class ResponseDepartmentDto {
  @ApiProperty({ description: 'ID único del departamento' })
  id: string;

  @ApiProperty({ description: 'Nombre del departamento' })
  name: string;

  @ApiProperty({ description: 'Descripción del departamento', nullable: true })
  description: string | null;
}
