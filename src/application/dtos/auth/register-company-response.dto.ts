import { ApiProperty } from '@nestjs/swagger';

export class RegisterCompanyResponseDto {
  @ApiProperty({ description: 'ID único de la empresa' })
  id: string;

  @ApiProperty({ description: 'Nombre de la empresa' })
  name: string;

  @ApiProperty({ description: 'Correo electrónico de la empresa' })
  email: string;
}
