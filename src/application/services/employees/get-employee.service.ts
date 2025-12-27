import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeRepository } from '@domain/repositories/employee.repository';
import { ResponseEmployeeDto } from '@application/dtos/employees/response-employee.dto';

@Injectable()
export class GetEmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(companyId: string, id: string): Promise<ResponseEmployeeDto> {
    const employee = await this.employeeRepository.findById(companyId, id);
    if (!employee) throw new NotFoundException('Empleado no encontrado');

    return {
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      isActive: employee.isActive,
      hiredAt: employee.hiredAt,
      department: employee.department
        ? {
            id: employee.department.id,
            name: employee.department.name,
            description: employee.department.description ?? null,
          }
        : null,
    };
  }
}
