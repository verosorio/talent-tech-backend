import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { CreateEmployeeDto } from '@application/dtos/employees/create-employee.dto';
import { EmployeeRepository } from '@domain/repositories/employee.repository';
import { DepartmentRepository } from '@domain/repositories/department.repository';
import { ResponseEmployeeDto } from '@application/dtos/employees/response-employee.dto';

@Injectable()
export class CreateEmployeeService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private departmentRepository: DepartmentRepository,
  ) {}

  async execute(
    companyId: string,
    dto: CreateEmployeeDto,
  ): Promise<ResponseEmployeeDto> {
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
    const employee = await this.employeeRepository.create({
      ...dto,
      companyId,
    });

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
