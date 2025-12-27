export class DepartmentSummaryDto {
  name: string;
  count: number;
}

export class CompanySummaryDto {
  totalEmployees: number;
  departments: DepartmentSummaryDto[];
}
