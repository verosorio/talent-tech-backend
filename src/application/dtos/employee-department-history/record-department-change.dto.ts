import { IsString, IsNotEmpty } from 'class-validator';

export class RecordDepartmentChangeDto {
  @IsString()
  @IsNotEmpty()
  departmentId: string;
}
