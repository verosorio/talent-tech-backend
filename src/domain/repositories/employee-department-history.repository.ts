import { EmployeeDepartmentHistory } from "@domain/entities/employee-history.entity";

export abstract class EmployeeDepartmentHistoryRepository {
  abstract create(history: {
    employeeId: string;
    departmentId: string;
    fromDate?: Date;
    toDate?: Date;
  }): Promise<EmployeeDepartmentHistory>;

  abstract findByEmployee(employeeId: string): Promise<EmployeeDepartmentHistory[]>;

  abstract updateToDate(historyId: string, toDate: Date): Promise<EmployeeDepartmentHistory>;
}
