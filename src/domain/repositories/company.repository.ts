import { Company } from '@domain/entities/company.entity';

export abstract class CompanyRepository {
  abstract findByEmail(email: string): Promise<Company | null>;
}
