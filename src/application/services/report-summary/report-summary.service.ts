import { CompanySummaryDto, DepartmentSummaryDto } from '@application/dtos/report-summary/report-summary.dto';
import { ReportRepository } from '@domain/repositories/report.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsService {
  constructor(private readonly reportsRepo: ReportRepository) {}

  async getCompanySummary(companyId: string): Promise<CompanySummaryDto> {
    const departments: DepartmentSummaryDto[] =
      await this.reportsRepo.getDepartmentsSummaryByCompany(companyId);

    const totalEmployees = departments.reduce((acc, d) => acc + d.count, 0);

    return { totalEmployees, departments };
  }
}
