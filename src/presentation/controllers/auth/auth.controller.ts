import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { LoginCompanyDto } from '@application/dtos/auth/login-company.dto';
import { LoginCompanyUseCase } from '@domain/uses-cases/auth/login-company.use-case';
import { LoginResponseDto } from '@application/dtos/auth/login-company-response.dto';
import { RegisterCompanyDto } from '@application/dtos/auth/register-company.dto';
import { RegisterCompanyResponseDto } from '@application/dtos/auth/register-company-response.dto';
import { RegisterCompanyUseCase } from '@domain/uses-cases/auth/register-company.use-case';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginCompanyUseCase: LoginCompanyUseCase,
    private readonly registerCompanyUseCase: RegisterCompanyUseCase,
  ) {}

  @Post('login')
  @HttpCode(200)
  @ApiBody({ type: LoginCompanyDto })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso',
    type: LoginResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Datos inválidos',
    schema: {
      example: {
        statusCode: 400,
        error: 'Bad Request',
        message: ['El correo electrónico debe ser válido'],
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Credenciales inválidas',
    schema: {
      example: {
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Credenciales inválidas',
      },
    },
  })
  async login(@Body() dto: LoginCompanyDto): Promise<LoginResponseDto> {
    return this.loginCompanyUseCase.execute(dto);
  }

  @Post('register')
  @ApiBody({ type: RegisterCompanyDto })
  @ApiResponse({
    status: 201,
    description: 'Registro exitoso',
    type: RegisterCompanyResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Datos inválidos',
    schema: {
      example: {
        statusCode: 400,
        error: 'Bad Request',
        message: [
          'El correo electrónico debe ser válido',
          'La contraseña debe tener al menos 6 caracteres',
          'El nombre es obligatorio',
        ],
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Conflicto: el correo ya existe',
    schema: {
      example: {
        statusCode: 409,
        error: 'Conflict',
        message: 'El correo electrónico ya está registrado',
      },
    },
  })
  async register(
    @Body() dto: RegisterCompanyDto,
  ): Promise<RegisterCompanyResponseDto> {
    return this.registerCompanyUseCase.execute(dto);
  }
}
