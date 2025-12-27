export interface EmployeeDepartmentHistory {
  id: string;
  employeeId: string;
  departmentId: string;
  fromDate: Date;
  toDate?: Date | null;
}
