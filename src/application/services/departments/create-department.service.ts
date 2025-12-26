import { ConflictException, Injectable } from '@nestjs/common';
import { DepartmentRepository } from '@domain/repositories/department.repository';
import { CreateDepartmentDto } from '@application/dtos/departments/create-department.dto';
import { ResponseDepartmentDto } from '@application/dtos/departments/response-department.dto';

@Injectable()
export class CreateDepartmentService {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async execute(companyId: string, dto: CreateDepartmentDto) : Promise<ResponseDepartmentDto> {
    const exists = await this.departmentRepository.existsByName(companyId, dto.name);

    if (exists) {
      throw new ConflictException(
        'Department name already exists for this company',
      );
    }

    return this.departmentRepository.create({
      companyId,
      name: dto.name,
      description: dto.description,
    });
  }
}
