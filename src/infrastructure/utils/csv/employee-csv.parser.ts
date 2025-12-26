import { parse } from "csv-parse/sync";

// convierte el archivo CSV en objetos JS.
// Cada fila del CSV se convierte en un objeto con claves basadas en los encabezados de columna.
// versión sync porque:
// El archivo ya está en memoria
// Es más simple
// No necesitas streams

export interface CsvEmployeeRow {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  isActive?: string;
  hiredAt: string;
}

export function parseEmployeeCsv(
  buffer: Buffer,
): CsvEmployeeRow[] {
  return parse(buffer, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
}