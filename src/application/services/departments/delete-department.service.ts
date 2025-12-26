import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DepartmentRepository } from '@domain/repositories/department.repository';

@Injectable()
export class DeleteDepartmentService {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async execute(companyId: string, id: string) {
    const department = await this.departmentRepository.findById(id);

    if (!department || department.companyId !== companyId) {
      throw new NotFoundException('Department not found');
    }

    await this.departmentRepository.softDelete(id);
  }
}
