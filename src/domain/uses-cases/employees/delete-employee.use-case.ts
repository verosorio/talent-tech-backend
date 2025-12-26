import { Injectable } from '@nestjs/common';
import { DeleteEmployeeService } from '@application/services/employees/delete-employee.service';

@Injectable()
export class DeleteEmployeeUseCase {
  constructor(private readonly deleteEmployeeService: DeleteEmployeeService) {}

  async execute(companyId: string, id: string): Promise<void> {
    await this.deleteEmployeeService.execute(companyId, id);
  }
}
