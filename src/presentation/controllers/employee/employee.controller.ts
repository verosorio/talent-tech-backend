import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Throttle } from '@nestjs/throttler';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ApiUnauthorized } from 'src/common/decorators/api-unauthorized.decorator';
import type { AuthenticatedRequest } from 'src/common/types/express';

import { CreateEmployeeDto } from '@application/dtos/employees/create-employee.dto';
import { ResponseEmployeeDto } from '@application/dtos/employees/response-employee.dto';
import { UpdateEmployeeDto } from '@application/dtos/employees/update-employee.dto';
import { ListEmployeesQueryDto } from '@application/dtos/employees/list-employees-query.dto';
import { BulkUploadResultDto } from '@application/dtos/employees/bulk/bulk-upload-result.dto';

import { CreateEmployeeUseCase } from '@domain/uses-cases/employees/create-employe.use-case';
import { ListEmployeesUseCase } from '@domain/uses-cases/employees/list-employees.use-case';
import { UpdateEmployeeUseCase } from '@domain/uses-cases/employees/update-employee.use-case';
import { DeleteEmployeeUseCase } from '@domain/uses-cases/employees/delete-employee.use-case';
import { GetEmployeeUseCase } from '@domain/uses-cases/employees/get-employee.use-case';
import { UploadEmployeesUseCase } from '@domain/uses-cases/employees/upload-employees.use-case';

@ApiTags('Empleados')
@ApiBearerAuth()
@Controller('employees')
@UseGuards(JwtAuthGuard) 
export class EmployeesController {
  constructor(
    private readonly createUseCase: CreateEmployeeUseCase,
    private readonly listUseCase: ListEmployeesUseCase,
    private readonly updateUseCase: UpdateEmployeeUseCase,
    private readonly deleteUseCase: DeleteEmployeeUseCase,
    private readonly getUseCase: GetEmployeeUseCase,
    private readonly uploadEmployeesUseCase: UploadEmployeesUseCase,
  ) {}

  private getCompanyId(request: AuthenticatedRequest): string {
    return request.user.uid;
  }

  @Post()
  @ApiBody({ type: CreateEmployeeDto })
  @ApiResponse({
    status: 201,
    description: 'Empleado creado correctamente',
    type: ResponseEmployeeDto,
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
  async create(
    @Req() request: AuthenticatedRequest,
    @Body() dto: CreateEmployeeDto,
  ): Promise<ResponseEmployeeDto> {
    const companyId = this.getCompanyId(request);
    return this.createUseCase.execute(companyId, dto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de empleados',
    type: [ResponseEmployeeDto],
  })
  @ApiUnauthorized()
  async findAll(
    @Req() request: AuthenticatedRequest,
    @Query(new ValidationPipe({ transform: true }))
    query: ListEmployeesQueryDto,
  ) {
    const companyId = this.getCompanyId(request);
    return this.listUseCase.execute(
      companyId,
      { page: query.page, limit: query.limit },
      {
        departmentId: query.departmentId,
        isActive: query.isActive,
        hiredFrom: query.hiredFrom ? new Date(query.hiredFrom) : undefined,
        hiredTo: query.hiredTo ? new Date(query.hiredTo) : undefined,
      },
    );
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Empleado encontrado',
    type: ResponseEmployeeDto,
  })
  @ApiUnauthorized()
  async findOne(@Req() request: AuthenticatedRequest, @Param('id') id: string) {
    return this.getUseCase.execute(this.getCompanyId(request), id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateEmployeeDto })
  @ApiResponse({
    status: 200,
    description: 'Empleado actualizado',
    type: ResponseEmployeeDto,
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
  async update(
    @Req() request: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateEmployeeDto,
  ) {
    return this.updateUseCase.execute(this.getCompanyId(request), id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Empleado eliminado correctamente' })
  @ApiUnauthorized()
  async delete(@Req() request: AuthenticatedRequest, @Param('id') id: string) {
    return this.deleteUseCase.execute(this.getCompanyId(request), id);
  }

  @Post('upload')
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: 2 * 1024 * 1024 } }),
  )
  @ApiResponse({
    status: 200,
    description: 'Archivo CSV procesado',
    type: BulkUploadResultDto,
  })
  @ApiUnauthorized()
  @ApiResponse({
    status: 400,
    description: 'Archivo inválido',
    schema: {
      example: {
        statusCode: 400,
        error: 'Bad Request',
        message: ['Archivo CSV requerido o formato incorrecto'],
      },
    },
  })
  async upload(
    @Req() request: AuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<BulkUploadResultDto> {
    if (!file) throw new BadRequestException('CSV file is required');
    if (!['text/csv', 'application/vnd.ms-excel'].includes(file.mimetype))
      throw new BadRequestException('Only CSV files are allowed');

    return this.uploadEmployeesUseCase.execute(
      this.getCompanyId(request),
      file.buffer,
    );
  }
}
