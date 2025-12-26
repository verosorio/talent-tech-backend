export interface BulkEmployeeDto {
  firstName: string;
  lastName: string;
  email: string;
  departmentName?: string;
  isActive?: boolean;
  hiredAt: Date;
}
