import { PaginationDto } from '@application/dtos/pagination/pagination.dto';
import { IsOptional, IsBoolean, IsUUID, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class ListEmployeesQueryDto extends PaginationDto {
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
