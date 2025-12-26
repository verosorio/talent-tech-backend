import { Injectable } from '@nestjs/common';
import { ListDepartmentsService } from '@application/services/departments/list-departments.service';
import { DepartmentResponseDto } from '@application/dtos/departments/department-response.dto';
import { PaginatedResponseDto } from '@application/dtos/pagination/paginated-response.dto';
import { Department } from '@domain/entities/department.entity';

@Injectable()
export class ListDepartmentsUseCase {
  constructor(
    private readonly listDepartmentsService: ListDepartmentsService,
  ) {}

  async execute(
    companyId: string,
    pagination: { page: number; limit: number },
  ): Promise<PaginatedResponseDto<DepartmentResponseDto>> {
    const { data, total } = await this.listDepartmentsService.execute(
      companyId,
      pagination,
    );

    const departmentsDto: DepartmentResponseDto[] = data.map(
      (dep: Department) => ({
        id: dep.id,
        name: dep.name,
        description: dep.description,
      }),
    );

    const totalPages = Math.ceil(total / pagination.limit);

    return {
      data: departmentsDto,
      meta: {
        total,
        page: pagination.page,
        limit: pagination.limit,
        totalPages,
      },
    };
  }
}
