import { PaginationDto } from '@application/dtos/pagination/pagination.dto';
import { Department } from '@domain/entities/department.entity';

export abstract class DepartmentRepository {
  abstract create(data: {
    companyId: string;
    name: string;
    description?: string;
  }): Promise<Department>;

  abstract findAllByCompany(
    companyId: string,
    pagination: PaginationDto,
  ): Promise<{
    data: Department[];
    total: number;
  }>;

  abstract findById(id: string): Promise<Department | null>;

  abstract update(
    id: string,
    data: {
      name?: string;
      description?: string | null;
    },
  ): Promise<Department>;

  abstract softDelete(id: string): Promise<void>;

  abstract existsByName(companyId: string, name: string): Promise<boolean>;
}
