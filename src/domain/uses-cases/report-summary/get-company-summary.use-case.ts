import { CompanySummaryDto } from '@application/dtos/report-summary/report-summary.dto';
import { ReportsService } from '@application/services/report-summary/report-summary.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetCompanySummaryUseCase {
  constructor(private readonly reportsService: ReportsService) {}

  async execute(companyId: string): Promise<CompanySummaryDto> {
    return this.reportsService.getCompanySummary(companyId);
  }
}
