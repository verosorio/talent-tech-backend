import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { RecordDepartmentChangeUseCase } from '@domain/uses-cases/employee-department-hitory/record-department-change.use-case';
import { RecordDepartmentChange } from '@application/services/employee-department-history/record-department-change.service';
import { GetEmployeeHistoryUseCase } from '@domain/uses-cases/employee-department-hitory/get-employee-history.use-case';
import { GetHistoryService } from '@application/services/employee-department-history/get-history.service';
import { EmployeeDepartmentHistoryDatasource } from '@infrastructure/datasources/employee-department-history.datasource';
import { EmployeeDepartmentHistoryRepository } from '@domain/repositories/employee-department-history.repository';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { EmployeeDepartmentHistoryController } from './employee-department-history.controller';

@Module({
  imports: [AuthModule],
  providers: [
    RecordDepartmentChangeUseCase,
    RecordDepartmentChange,
    GetEmployeeHistoryUseCase,
    GetHistoryService,
    {
      provide: EmployeeDepartmentHistoryRepository,
      useClass: EmployeeDepartmentHistoryDatasource,
    },
    JwtAuthGuard,
  ],
  controllers: [EmployeeDepartmentHistoryController],
  exports: [],
})
export class EmployeeDepartmentHistoryModule {}
