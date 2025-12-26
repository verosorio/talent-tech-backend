import { ResponseDepartmentDto } from "../departments/response-department.dto";

export class ResponseEmployeeDto {
  id: string;
 department: ResponseDepartmentDto | null; 
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  hiredAt: Date;
}
