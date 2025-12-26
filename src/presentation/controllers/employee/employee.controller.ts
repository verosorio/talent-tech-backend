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
  UseInterceptors,
  UploadedFile,
  BadRequestException,
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
import { UploadEmployeesUseCase } from '@domain/uses-cases/employees/upload-employees.use-case';
import { UpdateEmployeeDto } from '@application/dtos/employees/update-employee.dto';
import { ListEmployeesQueryDto } from '@application/dtos/employees/list-employees-query.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { BulkUploadResultDto } from '@application/dtos/employees/bulk/bulk-upload-result.dto';
import { parseEmployeeCsv } from '@infrastructure/utils/csv/employee-csv.parser';
import { BulkEmployeeDto } from '@application/dtos/employees/bulk/bulk-employee.dto';

@UseGuards(JwtAuthGuard)
@Controller('employees')
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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Req() request: AuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<BulkUploadResultDto> {
    if (!file) {
      throw new BadRequestException('CSV file is required');
    }

    let parsedCsv: any[];
    try {
      parsedCsv = parseEmployeeCsv(file.buffer);
    } catch (error) {
      throw new BadRequestException('Invalid CSV format');
    }

    const parsed: BulkEmployeeDto[] = parsedCsv.map((row) => ({
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      departmentName: row.departmentName,
      isActive: row.isActive
        ? row.isActive.toLowerCase() === 'true'
        : undefined,
      hiredAt: row.hiredAt,
    }));

    for (const row of parsed) {
      if (!row.firstName || !row.lastName || !row.email) {
        throw new BadRequestException('Missing required fields in CSV');
      }
    }

    const companyId = request.user.uid;

    return this.uploadEmployeesUseCase.execute(companyId, parsed);
  }
}
