import { Department } from "./department.entity";

export interface Employee {
  id: string;
  companyId: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  hiredAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  department?: Department | null;
}