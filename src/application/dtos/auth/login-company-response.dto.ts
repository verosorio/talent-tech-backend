import { ApiProperty } from "@nestjs/swagger";

export class LoginResponseDto {
   @ApiProperty({ description: 'Token de acceso para autenticación' })
  access_token: string;
}
