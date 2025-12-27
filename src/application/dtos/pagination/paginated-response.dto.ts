import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseMetaDto {
  @ApiProperty({ description: 'Total de elementos' })
  total: number;

  @ApiProperty({ description: 'Página actual' })
  page: number;

  @ApiProperty({ description: 'Límite de elementos por página' })
  limit: number;

  @ApiProperty({ description: 'Número total de páginas' })
  totalPages: number;
}

export class PaginatedResponseDto<T> {
  @ApiProperty({ description: 'Datos de la página', isArray: true })
  data: T[];

  @ApiProperty({ description: 'Metadatos de paginación', type: PaginatedResponseMetaDto })
  meta: PaginatedResponseMetaDto;

  constructor(data: T[], total: number, page: number, limit: number) {
    this.data = data;
    this.meta = {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
