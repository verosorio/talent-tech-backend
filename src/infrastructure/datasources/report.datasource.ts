import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/config';
import { ReportRepository } from '@domain/repositories/report.repository';
import { DepartmentSummaryDto } from '@application/dtos/report-summary/report-summary.dto';

@Injectable()
export class ReportsDatasource implements ReportRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getDepartmentsSummaryByCompany(
    companyId: string,
  ): Promise<DepartmentSummaryDto[]> {
    const departments = await this.prisma.department.findMany({
      where: { companyId },
      include: { employees: { where: { deletedAt: null } } },
    });

    const summaryMap = new Map<string, number>();
    departments.forEach((d) => {
      const count = d.employees.length;
      summaryMap.set(d.name, (summaryMap.get(d.name) || 0) + count);
    });

    return Array.from(summaryMap.entries()).map(([name, count]) => ({
      name,
      count,
    }));
  }
}
