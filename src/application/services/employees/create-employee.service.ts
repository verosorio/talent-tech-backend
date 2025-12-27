import { Injectable, ConflictException } from '@nestjs/common';
import { CreateEmployeeDto } from '@application/dtos/employees/create-employee.dto';
import { Employee } from '@domain/entities/employee.entity';
import { EmployeeRepository } from '@domain/repositories/employee.repository';

@Injectable()
export class CreateEmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(
    companyId: string,
    dto: CreateEmployeeDto
  ): Promise<Employee> {
    const exists = await this.employeeRepository.existsByEmail(
      companyId,
      dto.email
    );
    if (exists) {
      throw new ConflictException(
        'Email already exists for this company'
      );
    }
    return this.employeeRepository.create({
      ...dto,
      companyId,
    });
  }
}
