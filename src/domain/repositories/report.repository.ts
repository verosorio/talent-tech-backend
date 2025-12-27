import { DepartmentSummaryDto } from '@application/dtos/report-summary/report-summary.dto';

export abstract class ReportRepository {
  abstract getDepartmentsSummaryByCompany(
    companyId: string,
  ): Promise<DepartmentSummaryDto[]>;
}
