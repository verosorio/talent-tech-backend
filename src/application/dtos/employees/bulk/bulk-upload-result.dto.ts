import { ApiProperty } from '@nestjs/swagger';
import { BulkEmployeeDto } from './bulk-employee.dto';

class FailedBulkEmployeeDto {
  @ApiProperty({ description: 'Fila del empleado que falló' })
  row: BulkEmployeeDto;

  @ApiProperty({ description: 'Motivo del fallo' })
  reason: string;
}

export class BulkUploadResultDto {
  @ApiProperty({ description: 'Empleados cargados correctamente', type: [BulkEmployeeDto] })
  success: BulkEmployeeDto[];

  @ApiProperty({ description: 'Empleados que fallaron al cargar', type: [FailedBulkEmployeeDto] })
  failed: FailedBulkEmployeeDto[];
}
