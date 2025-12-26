import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Headers,
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
import { DepartmentResponseDto } from '@application/dtos/departments/department-response.dto';
import { PaginationDto } from '@application/dtos/pagination/pagination.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from 'src/common/types/express';

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
  create(
    @Req() request: AuthenticatedRequest,
    @Body() dto: CreateDepartmentDto,
  ): Promise<DepartmentResponseDto> {
    return this.createUseCase.execute(this.getCompanyId(request), dto);
  }

  @Get()
  findAll(
    @Req() request: AuthenticatedRequest,
    @Query(new ValidationPipe({ transform: true })) pagination: PaginationDto,
  ) {
    const companyId = this.getCompanyId(request);
    return this.listUseCase.execute(companyId, pagination);
  }

  @Get(':id')
  findOne(
    @Req() request: AuthenticatedRequest,
    @Param('id') id: string,
  ): Promise<DepartmentResponseDto> {
    return this.getUseCase.execute(this.getCompanyId(request), id);
  }

  @Patch(':id')
  update(
    @Req() request: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateDepartmentDto,
  ): Promise<DepartmentResponseDto> {
    return this.updateUseCase.execute(this.getCompanyId(request), id, dto);
  }

  @Delete(':id')
  delete(@Req() request: AuthenticatedRequest, @Param('id') id: string) {
    return this.deleteUseCase.execute(this.getCompanyId(request), id);
  }
}
