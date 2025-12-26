// src/application/controllers/employees.controller.ts
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
} from '@nestjs/common';
import { CreateEmployeeDto } from '@application/dtos/employees/create-employee.dto';
import { ResponseEmployeeDto } from '@application/dtos/employees/response-employee.dto';
import type { AuthenticatedRequest } from 'src/common/types/express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateEmployeeUseCase } from '@domain/uses-cases/employees/create-employe.use-case';
import { GetEmployeeUseCase } from '@domain/uses-cases/employees/get-employee.use-case';
import { ListEmployeesUseCase } from '@domain/uses-cases/employees/list-employees.use-case';
import { UpdateEmployeeUseCase } from '@domain/uses-cases/employees/update-employee.use-case';
import { DeleteEmployeeUseCase } from '@domain/uses-cases/employees/delete-employee.use-case';
import { UpdateEmployeeDto } from '@application/dtos/employees/update-employee.dto';
import { PaginationDto } from '@application/dtos/pagination/pagination.dto';
import { EmployeeFiltersDto } from '@application/dtos/employees/employee-filters.dto';
import { ListEmployeesQueryDto } from '@application/dtos/employees/list-employees-query.dto';

@UseGuards(JwtAuthGuard)
@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly createUseCase: CreateEmployeeUseCase,
    private readonly listUseCase: ListEmployeesUseCase,
    private readonly updateUseCase: UpdateEmployeeUseCase,
    private readonly deleteUseCase: DeleteEmployeeUseCase,
    private readonly getUseCase: GetEmployeeUseCase,
  ) {}

  private getCompanyId(request: AuthenticatedRequest): string {
    return request.user.uid;
  }

  @Post()
  async create(
    @Req() request: AuthenticatedRequest,
    @Body() dto: CreateEmployeeDto,
  ): Promise<ResponseEmployeeDto> {
    const companyId = this.getCompanyId(request);
    return this.createUseCase.execute(companyId, dto);
  }

  @Get()
  findAll(
    @Req() request: AuthenticatedRequest,
    @Query(new ValidationPipe({ transform: true }))
    query: ListEmployeesQueryDto,
  ) {
    const companyId = request.user.uid;

    return this.listUseCase.execute(
      companyId,
      {
        page: query.page,
        limit: query.limit,
      },
      {
        departmentId: query.departmentId,
        isActive: query.isActive,
        hiredFrom: query.hiredFrom ? new Date(query.hiredFrom) : undefined,
        hiredTo: query.hiredTo ? new Date(query.hiredTo) : undefined,
      },
    );
  }

  @Get(':id')
  async findOne(@Req() request: AuthenticatedRequest, @Param('id') id: string) {
    return this.getUseCase.execute(request.user.uid, id);
  }

  @Patch(':id')
  async update(
    @Req() request: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateEmployeeDto,
  ) {
    return this.updateUseCase.execute(request.user.uid, id, dto);
  }

  @Delete(':id')
  async delete(@Req() request: AuthenticatedRequest, @Param('id') id: string) {
    return this.deleteUseCase.execute(request.user.uid, id);
  }
}
