import { CompanySummaryDto } from '@application/dtos/report-summary/report-summary.dto';
import { GetCompanySummaryUseCase } from '@domain/uses-cases/report-summary/get-company-summary.use-case';
import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiUnauthorized } from 'src/common/decorators/api-unauthorized.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from 'src/common/types/express';

@ApiTags('Reportes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportController {
  constructor(private readonly getSummaryUseCase: GetCompanySummaryUseCase) {}

  private getCompanyId(request: AuthenticatedRequest): string {
    return request.user.uid;
  }

  @Get('summary')
  @ApiOperation({ summary: 'Resumen de empleados por empresa y departamento' })
  @ApiResponse({
    status: 200,
    description: 'Resumen obtenido',
    type: CompanySummaryDto,
  })
  @ApiUnauthorized()
  async getSummary(
    @Req() request: AuthenticatedRequest,
  ): Promise<CompanySummaryDto> {
    return this.getSummaryUseCase.execute(this.getCompanyId(request));
  }
}
