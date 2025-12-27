import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DepartmentRepository } from '@domain/repositories/department.repository';
import { UpdateDepartmentDto } from '@application/dtos/departments/update-department.dto';
import { ResponseDepartmentDto } from '@application/dtos/departments/response-department.dto';

@Injectable()
export class UpdateDepartmentService {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async execute(
    companyId: string,
    id: string,
    dto: UpdateDepartmentDto,
  ) : Promise<ResponseDepartmentDto> {
    const department = await this.departmentRepository.findById(id);

    if (!department || department.companyId !== companyId) {
      throw new NotFoundException('Departamento no encontrado');
    }

    return this.departmentRepository.update(id, dto);
  }
}
