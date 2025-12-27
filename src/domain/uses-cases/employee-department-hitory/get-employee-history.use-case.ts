import { Injectable } from '@nestjs/common';
import { EmployeeDepartmentHistory } from '@domain/entities/employee-history.entity';
import { GetHistoryService } from '@application/services/employee-department-history/get-history.service';

@Injectable()
export class GetEmployeeHistoryUseCase {
  constructor(
    private readonly historyService: GetHistoryService,
  ) {}

  async execute(employeeId: string): Promise<EmployeeDepartmentHistory[]> {
    return this.historyService.execute(employeeId);
  }
}
