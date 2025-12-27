import { EmployeeDepartmentHistory } from '@domain/entities/employee-history.entity';

export class EmployeeHistoryResponseDto {
  id: string;
  employeeId: string;
  departmentId: string;
  fromDate: Date;
  toDate?: Date;

  constructor(entity: EmployeeDepartmentHistory) {
    this.id = entity.id;
    this.employeeId = entity.employeeId;
    this.departmentId = entity.departmentId;
    this.fromDate = entity.fromDate;
    this.toDate = entity.toDate ?? undefined;
  }
}
