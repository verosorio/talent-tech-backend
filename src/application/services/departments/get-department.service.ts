import { Injectable, NotFoundException } from '@nestjs/common';
import { DepartmentRepository } from '@domain/repositories/department.repository';
import { DepartmentResponseDto } from '@application/dtos/departments/department-response.dto';

@Injectable()
export class GetDepartmentService {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async execute(companyId: string, id: string) : Promise<DepartmentResponseDto> {
    const department = await this.departmentRepository.findById(id);

    if (!department || department.companyId !== companyId) {
      throw new NotFoundException('Department not found');
    }

    return department;
  }
}
