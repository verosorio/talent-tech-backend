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
import { PaginatedResponseDto } from '@application/dtos/pagination/paginated-response.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

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

  private getCompanyId(headers: any): string {
    return headers['x-company-id'];
  }

  @Post()
  create(
    @Headers() headers,
    @Body() dto: CreateDepartmentDto,
  ): Promise<DepartmentResponseDto> {
    return this.createUseCase.execute(this.getCompanyId(headers), dto);
  }

  @Get()
  findAll(
    @Headers() headers,
    @Query(new ValidationPipe({ transform: true })) pagination: PaginationDto,
  ) {
    const companyId = this.getCompanyId(headers);
    return this.listUseCase.execute(companyId, pagination);
  }

  @Get(':id')
  findOne(
    @Headers() headers,
    @Param('id') id: string,
  ): Promise<DepartmentResponseDto> {
    return this.getUseCase.execute(this.getCompanyId(headers), id);
  }

  @Patch(':id')
  update(
    @Headers() headers,
    @Param('id') id: string,
    @Body() dto: UpdateDepartmentDto,
  ): Promise<DepartmentResponseDto> {
    return this.updateUseCase.execute(this.getCompanyId(headers), id, dto);
  }

  @Delete(':id')
  delete(@Headers() headers, @Param('id') id: string) {
    return this.deleteUseCase.execute(this.getCompanyId(headers), id);
  }
}
