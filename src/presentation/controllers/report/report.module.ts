import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ReportController } from './report.controller';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ReportsService } from '@application/services/report-summary/report-summary.service';
import { GetCompanySummaryUseCase } from '@domain/uses-cases/report-summary/get-company-summary.use-case';
import { ReportRepository } from '@domain/repositories/report.repository';
import { ReportsDatasource } from '@infrastructure/datasources/report.datasource';

@Module({
  imports: [AuthModule],
  providers: [
    ReportsService,
    GetCompanySummaryUseCase,
    {
      provide: ReportRepository,
      useClass: ReportsDatasource,
    },
    JwtAuthGuard,
  ],
  controllers: [ReportController],
  exports: [],
})
export class ReportModule {}
