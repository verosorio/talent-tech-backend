import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateDepartmentDto } from '@application/dtos/departments/create-department.dto';
import { UpdateDepartmentDto } from '@application/dtos/departments/update-department.dto';
import { CreateDepartmentUseCase } from '@domain/uses-cases/departments/create-department.use-case';
import { ListDepartmentsUseCase } from '@domain/uses-cases/departments/list-departments.use-case';
import { UpdateDepartmentUseCase } from '@domain/uses-cases/departments/update-department.use-case';
import { DeleteDepartmentUseCase } from '@domain/uses-cases/departments/delete-department.use-case';
import { GetDepartmentService } from '@application/services/departments/get-department.service';
import { ResponseDepartmentDto } from '@application/dtos/departments/response-department.dto';
import { PaginationDto } from '@application/dtos/pagination/pagination.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from 'src/common/types/express';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiUnauthorized } from 'src/common/decorators/api-unauthorized.decorator';
import { PaginatedMetaResponseDto } from '@application/dtos/pagination/pagination-meta.dto';

@ApiTags('Departamentos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('departments')
export class DepartmentsController {
  constructor(
    private readonly createUseCase: CreateDepartmentUseCase,
    private readonly listUseCase: ListDepartmentsUseCase,
    private readonly updateUseCase: UpdateDepartmentUseCase,
    private readonly deleteUseCase: DeleteDepartmentUseCase,
    private readonly getUseCase: GetDepartmentService,
  ) {}

  private getCompanyId(request: AuthenticatedRequest): string {
    return request.user.uid;
  }

  @Post()
  @ApiBody({ type: CreateDepartmentDto })
  @ApiResponse({
    status: 201,
    description: 'Departamento creado',
    type: ResponseDepartmentDto,
  })
  @ApiUnauthorized()
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
    schema: {
      example: {
        statusCode: 400,
        error: 'Bad Request',
        message: ['Campo inválido'],
      },
    },
  })
  create(
    @Req() request: AuthenticatedRequest,
    @Body() dto: CreateDepartmentDto,
  ): Promise<ResponseDepartmentDto> {
    return this.createUseCase.execute(this.getCompanyId(request), dto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de departamentos paginada',
    type: PaginatedMetaResponseDto<ResponseDepartmentDto>,
  })
  @ApiUnauthorized()
  findAll(
    @Req() request: AuthenticatedRequest,
    @Query(new ValidationPipe({ transform: true })) pagination: PaginationDto,
  ) {
    const companyId = this.getCompanyId(request);
    return this.listUseCase.execute(companyId, pagination);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Departamento encontrado',
    type: ResponseDepartmentDto,
  })
  @ApiUnauthorized()
  @ApiResponse({
    status: 404,
    description: 'Departamento no encontrado',
    schema: {
      example: {
        statusCode: 404,
        error: 'Not Found',
        message: 'Departamento no encontrado',
      },
    },
  })
  findOne(
    @Req() request: AuthenticatedRequest,
    @Param('id') id: string,
  ): Promise<ResponseDepartmentDto> {
    return this.getUseCase.execute(this.getCompanyId(request), id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateDepartmentDto })
  @ApiResponse({
    status: 200,
    description: 'Departamento actualizado',
    type: ResponseDepartmentDto,
  })
  @ApiUnauthorized()
  @ApiResponse({
    status: 404,
    description: 'Departamento no encontrado',
    schema: {
      example: {
        statusCode: 404,
        error: 'Not Found',
        message: 'Departamento no encontrado',
      },
    },
  })
  update(
    @Req() request: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateDepartmentDto,
  ): Promise<ResponseDepartmentDto> {
    return this.updateUseCase.execute(this.getCompanyId(request), id, dto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Departamento eliminado correctamente',
  })
  @ApiUnauthorized()
  @ApiResponse({
    status: 404,
    description: 'Departamento no encontrado',
    schema: {
      example: {
        statusCode: 404,
        error: 'Not Found',
        message: 'Departamento no encontrado',
      },
    },
  })
  delete(@Req() request: AuthenticatedRequest, @Param('id') id: string) {
    return this.deleteUseCase.execute(this.getCompanyId(request), id);
  }
}
