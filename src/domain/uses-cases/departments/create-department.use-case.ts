import { Injectable } from '@nestjs/common';
import { CreateDepartmentService } from '@application/services/departments/create-department.service';
import { CreateDepartmentDto } from '@application/dtos/departments/create-department.dto';
import { DepartmentResponseDto } from '@application/dtos/departments/department-response.dto';

@Injectable()
export class CreateDepartmentUseCase {
  constructor(private readonly createDepartmentService: CreateDepartmentService) {}

  async execute(companyId: string, dto: CreateDepartmentDto): Promise<DepartmentResponseDto> {
    const department = await this.createDepartmentService.execute(companyId, dto);
    return {
      id: department.id,
      name: department.name,
      description: department.description,
    };
  }
}
