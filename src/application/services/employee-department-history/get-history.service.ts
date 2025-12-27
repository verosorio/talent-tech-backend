import { Injectable } from '@nestjs/common';
import { EmployeeDepartmentHistoryRepository } from '@domain/repositories/employee-department-history.repository';
import { EmployeeDepartmentHistory } from '@domain/entities/employee-history.entity';

@Injectable()
export class GetHistoryService {
  constructor(
    private readonly historyRepo: EmployeeDepartmentHistoryRepository,
  ) {}

  async execute(employeeId: string): Promise<EmployeeDepartmentHistory[]> {
    return this.historyRepo.findByEmployee(employeeId);
  }
}
