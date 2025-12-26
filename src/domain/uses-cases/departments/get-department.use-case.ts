import { Injectable } from '@nestjs/common';
import { GetDepartmentService } from '@application/services/departments/get-department.service';
import { ResponseDepartmentDto } from '@application/dtos/departments/response-department.dto';

@Injectable()
export class GetDepartmentUseCase {
  constructor(private readonly getDepartmentService: GetDepartmentService) {}

  async execute(companyId: string, id: string): Promise<ResponseDepartmentDto> {
    const department = await this.getDepartmentService.execute(companyId, id);
    return {
      id: department.id,
      name: department.name,
      description: department.description,
    } ;
  }
}
