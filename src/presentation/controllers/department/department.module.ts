import { Get, Module } from '@nestjs/common';
import { CreateDepartmentService } from '@application/services/departments/create-department.service';
import { CreateDepartmentUseCase } from '@domain/uses-cases/departments/create-department.use-case';
import { DeleteDepartmentUseCase } from '@domain/uses-cases/departments/delete-department.use-case';
import { DeleteDepartmentService } from '@application/services/departments/delete-department.service';
import { ListDepartmentsUseCase } from '@domain/uses-cases/departments/list-departments.use-case';
import { ListDepartmentsService } from '@application/services/departments/list-departments.service';
import { UpdateDepartmentUseCase } from '@domain/uses-cases/departments/update-department.use-case';
import { UpdateDepartmentService } from '@application/services/departments/update-department.service';
import { GetDepartmentService } from '@application/services/departments/get-department.service';
import { DepartmentRepository } from '@domain/repositories/department.repository';
import { DepartmentDatasource } from '@infrastructure/datasources/department.datasource';
import { DepartmentsController } from './department.controller';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { GetDepartmentUseCase } from '@domain/uses-cases/departments/get-department.use-case';

@Module({
imports: [
    AuthModule, 
  ],
 providers: [
    CreateDepartmentUseCase,
    CreateDepartmentService,
    DeleteDepartmentUseCase,
    DeleteDepartmentService,
    ListDepartmentsUseCase,
    ListDepartmentsService,
    UpdateDepartmentUseCase,
    UpdateDepartmentService,
    GetDepartmentUseCase,
    GetDepartmentService,
    {
      provide: DepartmentRepository,
      useClass: DepartmentDatasource,
    },
    JwtAuthGuard
  ],
  controllers: [DepartmentsController],
  exports: [],
})
export class DepartmentModule {}
