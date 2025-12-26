import { Injectable } from '@nestjs/common';
import { DepartmentRepository } from '@domain/repositories/department.repository';
import { PaginationDto } from '@application/dtos/pagination/pagination.dto';
import { Department } from '@domain/entities/department.entity';

@Injectable()
export class ListDepartmentsService {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async execute(
    companyId: string,
    pagination: PaginationDto,
  ): Promise<{ data: Department[]; total: number }> {
    return this.departmentRepository.findAllByCompany(companyId, pagination);
  }
}
