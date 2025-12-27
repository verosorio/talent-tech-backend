import { Injectable } from '@nestjs/common';
import { EmployeeDepartmentHistory } from '@domain/entities/employee-history.entity';
import { RecordDepartmentChange } from '@application/services/employee-department-history/record-department-change.service';

@Injectable()
export class RecordDepartmentChangeUseCase {
  constructor(
    private readonly historyService: RecordDepartmentChange,
  ) {}

  async execute(
    employeeId: string,
    newDepartmentId: string,
  ): Promise<EmployeeDepartmentHistory> {
    return this.historyService.execute(employeeId, newDepartmentId);
  }
}
