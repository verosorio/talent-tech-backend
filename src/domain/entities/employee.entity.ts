export interface Employee {
  id: string;
  companyId: string;
  departmentId: string | null;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  hireAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
