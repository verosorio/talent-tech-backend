import { Injectable } from '@nestjs/common';
import { UpdateDepartmentService } from '@application/services/departments/update-department.service';
import { UpdateDepartmentDto } from '@application/dtos/departments/update-department.dto';
import { ResponseDepartmentDto } from '@application/dtos/departments/response-department.dto';

@Injectable()
export class UpdateDepartmentUseCase {
  constructor(private readonly updateDepartmentService: UpdateDepartmentService) {}

  async execute(companyId: string, id: string, dto: UpdateDepartmentDto) : Promise<ResponseDepartmentDto> {
    const department = await this.updateDepartmentService.execute(companyId, id, dto);
    return {
      id: department.id,
      name: department.name,
      description: department.description,
    } ;
  }
}
