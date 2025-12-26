import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeRepository } from '@domain/repositories/employee.repository';
import { Employee } from '@domain/entities/employee.entity';

@Injectable()
export class GetEmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(companyId: string, id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findById(companyId, id);
    if (!employee) throw new NotFoundException('Employee not found');
    return employee;
  }
}
