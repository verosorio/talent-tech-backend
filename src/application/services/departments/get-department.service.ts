import { Injectable, NotFoundException } from '@nestjs/common';
import { DepartmentRepository } from '@domain/repositories/department.repository';
import { ResponseDepartmentDto } from '@application/dtos/departments/response-department.dto';

@Injectable()
export class GetDepartmentService {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async execute(companyId: string, id: string): Promise<ResponseDepartmentDto> {
    const department = await this.departmentRepository.findById(id);

    if (!department || department.companyId !== companyId) {
      throw new NotFoundException('Departamento no encontrado');
    }

    const response: ResponseDepartmentDto = {
      id: department.id,
      name: department.name,
      description: department.description,
    };

    return response;
  }
}
