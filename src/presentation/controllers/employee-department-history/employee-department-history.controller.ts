import { EmployeeHistoryResponseDto } from '@application/dtos/employee-department-history/employee-history-response.dto';
import { RecordDepartmentChangeDto } from '@application/dtos/employee-department-history/record-department-change.dto';
import { GetEmployeeHistoryUseCase } from '@domain/uses-cases/employee-department-hitory/get-employee-history.use-case';
import { RecordDepartmentChangeUseCase } from '@domain/uses-cases/employee-department-hitory/record-department-change.use-case';
import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiUnauthorized } from 'src/common/decorators/api-unauthorized.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from 'src/common/types/express';

@ApiTags('Historial Departamento - Empleado')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('employees/:id/department')
export class EmployeeDepartmentHistoryController {
  constructor(
    private readonly recordChangeUseCase: RecordDepartmentChangeUseCase,
    private readonly getHistoryUseCase: GetEmployeeHistoryUseCase,
  ) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Registrar cambio de departamento de un empleado' })
  @ApiParam({
    name: 'id',
    description: 'ID del empleado cuyo departamento se va a cambiar',
    type: String,
  })
  @ApiBody({ type: RecordDepartmentChangeDto })
  @ApiResponse({
    status: 201,
    description: 'Cambio registrado correctamente',
    type: EmployeeHistoryResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Empleado o departamento no encontrado',
  })
  async recordChange(
    @Param('id') employeeId: string,
    @Req() request: AuthenticatedRequest,
    @Body() dto: RecordDepartmentChangeDto,
  ): Promise<EmployeeHistoryResponseDto> {
    const history = await this.recordChangeUseCase.execute(
      employeeId,
      dto.departmentId,
    );
    return new EmployeeHistoryResponseDto(history);
  }

  @Get('history')
  @ApiUnauthorized()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtener historial de cambios de departamento de un empleado',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del empleado',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Historial obtenido correctamente',
    type: [EmployeeHistoryResponseDto],
  })
  @ApiResponse({ status: 404, description: 'Empleado no encontrado' })
  async getHistory(
    @Param('id') employeeId: string,
    @Req() request: AuthenticatedRequest,
  ): Promise<EmployeeHistoryResponseDto[]> {
    const histories = await this.getHistoryUseCase.execute(employeeId);
    return histories.map((h) => new EmployeeHistoryResponseDto(h));
  }
}
