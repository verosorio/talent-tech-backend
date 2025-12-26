import { IsOptional, IsBoolean, IsUUID, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class EmployeeFiltersDto {
  @IsOptional()
  @IsUUID()
  departmentId?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsDateString()
  hiredFrom?: string;

  @IsOptional()
  @IsDateString()
  hiredTo?: string;
}
