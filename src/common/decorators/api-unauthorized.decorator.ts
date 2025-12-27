// src/common/decorators/api-unauthorized.decorator.ts
import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiUnauthorized() {
  return applyDecorators(
    ApiResponse({
      status: 401,
      description: 'Credenciales inválidas',
      schema: {
        example: {
          statusCode: 401,
          error: 'Unauthorized',
          message: 'Credenciales inválidas',
        },
      },
    }),
  );
}
