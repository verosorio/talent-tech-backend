
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
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from 'src/common/types/express';

@UseGuards(JwtAuthGuard)
@Controller('employees/:id/department')
export class EmployeeDepartmentHistoryController {
  constructor(
    private readonly recordChangeUseCase: RecordDepartmentChangeUseCase,
    private readonly getHistoryUseCase: GetEmployeeHistoryUseCase,
  ) {}

  @Post()
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
  async getHistory(
    @Param('id') employeeId: string,
    @Req() request: AuthenticatedRequest,
  ): Promise<EmployeeHistoryResponseDto[]> {
    const histories = await this.getHistoryUseCase.execute(employeeId);
    return histories.map(h => new EmployeeHistoryResponseDto(h));
  }
}
