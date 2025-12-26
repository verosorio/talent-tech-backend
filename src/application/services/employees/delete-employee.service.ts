import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeRepository } from '@domain/repositories/employee.repository';

@Injectable()
export class DeleteEmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(companyId: string, id: string): Promise<void> {
    const employee = await this.employeeRepository.findById(companyId, id);
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    await this.employeeRepository.delete(companyId, id);
  }
}
