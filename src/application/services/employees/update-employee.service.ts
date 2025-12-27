import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { EmployeeRepository } from '@domain/repositories/employee.repository';
import { Employee } from '@domain/entities/employee.entity';
import { UpdateEmployeeDto } from '@application/dtos/employees/update-employee.dto';

@Injectable()
export class UpdateEmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(companyId: string, id: string, dto: UpdateEmployeeDto): Promise<Employee> {
    const employee = await this.employeeRepository.findById(companyId, id);
    if (!employee) {
      throw new NotFoundException('Empleado no encontrado');
    }

    if (dto.email && dto.email !== employee.email) {
      const exists = await this.employeeRepository.existsByEmail(companyId, dto.email);
      if (exists) {
        throw new ConflictException('El email ya se encuentra registrado en esta compañía');
      }
    }

    return this.employeeRepository.update(companyId, id, dto);
  }
}
