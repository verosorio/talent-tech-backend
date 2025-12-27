import { Injectable } from '@nestjs/common';
import { EmployeeDepartmentHistoryRepository } from '@domain/repositories/employee-department-history.repository';
import { EmployeeDepartmentHistory } from '@domain/entities/employee-history.entity';

@Injectable()
export class RecordDepartmentChange {
  constructor(
    private readonly historyRepo: EmployeeDepartmentHistoryRepository,
  ) {}

  async execute(
    employeeId: string,
    newDepartmentId: string,
  ): Promise<EmployeeDepartmentHistory> {
    const history = await this.historyRepo.findByEmployee(employeeId);
    const lastRecord = history[0];

    if (lastRecord && lastRecord.toDate === undefined) {
      await this.historyRepo.updateToDate(lastRecord.id, new Date());
    }
    return this.historyRepo.create({
      employeeId,
      departmentId: newDepartmentId,
    });
  }
}
