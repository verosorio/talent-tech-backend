import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { EmployeeRepository } from '@domain/repositories/employee.repository';
import { Employee } from '@domain/entities/employee.entity';
import { UpdateEmployeeDto } from '@application/dtos/employees/update-employee.dto';
import { DepartmentRepository } from '@domain/repositories/department.repository';

@Injectable()
export class UpdateEmployeeService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly departmentRepository: DepartmentRepository,
  ) {}

  async execute(
    companyId: string,
    id: string,
    dto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const employee = await this.employeeRepository.findById(companyId, id);
    if (!employee) {
      throw new NotFoundException('Empleado no encontrado');
    }

    if (dto.email && dto.email !== employee.email) {
      const exists = await this.employeeRepository.existsByEmail(
        companyId,
        dto.email,
      );
      if (exists) {
        throw new ConflictException(
          'El email ya se encuentra registrado en esta compañía',
        );
      }
    }

    if (dto.departmentId) {
      const department = await this.departmentRepository.findById(
        dto.departmentId,
      );
      if (!department || department.companyId !== companyId) {
        throw new BadRequestException('El Departamento indicado no existe');
      }
    }

    return this.employeeRepository.update(companyId, id, dto);
  }
}
