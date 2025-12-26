import { Module } from '@nestjs/common';
import { EmployeesController } from './employee.controller';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { EmployeeRepository } from '@domain/repositories/employee.repository';
import { EmployeeDatasource } from '@infrastructure/datasources/employee.datasource';
import { AuthModule } from '../auth/auth.module';
import { CreateEmployeeUseCase } from '@domain/uses-cases/employees/create-employe.use-case';
import { CreateEmployeeService } from '@application/services/employees/create-employe.service';
import { DeleteEmployeeUseCase } from '@domain/uses-cases/employees/delete-employee.use-case';
import { DeleteEmployeeService } from '@application/services/employees/delete-employee.service';
import { ListEmployeesUseCase } from '@domain/uses-cases/employees/list-employees.use-case';
import { ListEmployeesService } from '@application/services/employees/list-employees.service';
import { UpdateEmployeeUseCase } from '@domain/uses-cases/employees/update-employee.use-case';
import { UpdateEmployeeService } from '@application/services/employees/update-employee.service';
import { GetDepartmentService } from '@application/services/departments/get-department.service';
import { DepartmentRepository } from '@domain/repositories/department.repository';
import { DepartmentDatasource } from '@infrastructure/datasources/department.datasource';
import { GetEmployeeService } from '@application/services/employees/get-employee.service';
import { GetEmployeeUseCase } from '@domain/uses-cases/employees/get-employee.use-case';
import { UploadEmployeesUseCase } from '@domain/uses-cases/employees/upload-employees.use-case';
import { UploadEmployeesService } from '@application/services/employees/upload-employees.service';

@Module({
  imports: [AuthModule],
  providers: [
    CreateEmployeeUseCase,
    CreateEmployeeService,
    DeleteEmployeeUseCase,
    DeleteEmployeeService,
    ListEmployeesUseCase,
    ListEmployeesService,
    UpdateEmployeeUseCase,
    UpdateEmployeeService,
    GetEmployeeUseCase,
    GetEmployeeService,
    UploadEmployeesUseCase,
    UploadEmployeesService,
    {
      provide: EmployeeRepository,
      useClass: EmployeeDatasource,
    },
    {
      provide: DepartmentRepository,
      useClass: DepartmentDatasource,
    },
    JwtAuthGuard,
  ],
  controllers: [EmployeesController],
  exports: [],
})
export class EmployeeModule {}
