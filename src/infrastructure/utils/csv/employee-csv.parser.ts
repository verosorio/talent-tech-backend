import { parse } from "csv-parse/sync";
import { BadRequestException } from '@nestjs/common';

export interface CsvEmployeeRow {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  isActive?: string;
  hiredAt: string;
}

export function parseEmployeeCsv(buffer: Buffer): CsvEmployeeRow[] {
  const records: CsvEmployeeRow[] = parse(buffer, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as CsvEmployeeRow[];

  if (!records.length) {
    throw new BadRequestException('El CSV está vacío');
  }

  const expectedHeaders: (keyof CsvEmployeeRow)[] = [
    'firstName',
    'lastName',
    'email',
    'department',
    'hiredAt',
    'isActive',
  ];

  const actualHeaders = Object.keys(records[0]) as (keyof CsvEmployeeRow)[];
  const missingHeaders = expectedHeaders.filter(h => !actualHeaders.includes(h));

  if (missingHeaders.length > 0) {
    throw new BadRequestException(
      `El CSV es inválido. Faltan columnas: ${missingHeaders.join(', ')}`
    );
  }

  return records;
}
