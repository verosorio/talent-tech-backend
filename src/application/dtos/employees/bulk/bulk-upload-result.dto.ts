import { BulkEmployeeDto } from "./bulk-employee.dto";

export interface BulkUploadResultDto {
  success: BulkEmployeeDto[];
  failed: {
    row: BulkEmployeeDto;
    reason: string;
  }[];
}