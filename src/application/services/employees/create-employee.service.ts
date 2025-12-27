import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { CreateEmployeeDto } from '@application/dtos/employees/create-employee.dto';
import { Employee } from '@domain/entities/employee.entity';
import { EmployeeRepository } from '@domain/repositories/employee.repository';
import { DepartmentRepository } from '@domain/repositories/department.repository';

@Injectable()
export class CreateEmployeeService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private departmentRepository: DepartmentRepository,
  ) {}

  async execute(companyId: string, dto: CreateEmployeeDto): Promise<Employee> {
    const exists = await this.employeeRepository.existsByEmail(
      companyId,
      dto.email,
    );
    if (exists) {
      throw new ConflictException(
        'El email ya se encuentra registrado en esta compañía',
      );
    }
    if (dto.departmentId) {
      const department = await this.departmentRepository.findById(
        dto.departmentId,
      );
      if (!department || department.companyId !== companyId) {
        throw new BadRequestException('El Departamento indicado no existe');
      }
    }
    return this.employeeRepository.create({
      ...dto,
      companyId,
    });
  }
}
