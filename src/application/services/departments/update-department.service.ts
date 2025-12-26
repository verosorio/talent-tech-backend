import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DepartmentRepository } from '@domain/repositories/department.repository';
import { UpdateDepartmentDto } from '@application/dtos/departments/update-department.dto';
import { DepartmentResponseDto } from '@application/dtos/departments/department-response.dto';

@Injectable()
export class UpdateDepartmentService {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async execute(
    companyId: string,
    id: string,
    dto: UpdateDepartmentDto,
  ) : Promise<DepartmentResponseDto> {
    const department = await this.departmentRepository.findById(id);

    if (!department || department.companyId !== companyId) {
      throw new NotFoundException('Department not found');
    }

    return this.departmentRepository.update(id, dto);
  }
}
