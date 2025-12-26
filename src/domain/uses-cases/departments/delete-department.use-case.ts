import { Injectable } from '@nestjs/common';
import { DeleteDepartmentService } from '@application/services/departments/delete-department.service';

@Injectable()
export class DeleteDepartmentUseCase {
  constructor(private readonly deleteDepartmentService: DeleteDepartmentService) {}

  async execute(companyId: string, id: string) {
    return this.deleteDepartmentService.execute(companyId, id);
  }
}
