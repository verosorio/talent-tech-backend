import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseDepartmentDto {
  @ApiProperty({ description: 'ID único del departamento' })
  id: string;

  @ApiProperty({ description: 'Nombre del departamento' })
  name: string;

  @ApiPropertyOptional({
    description: 'Descripción del departamento',
    example: 'Descripción opcional',
  })
  description?: string | null;
}
