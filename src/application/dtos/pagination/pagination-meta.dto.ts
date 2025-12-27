import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaDto {
  @ApiProperty() total: number;
  @ApiProperty() page: number;
  @ApiProperty() limit: number;
  @ApiProperty() totalPages: number;
}

export class PaginatedMetaResponseDto<T> {
  @ApiProperty({ isArray: true })
  data: T[];

  @ApiProperty() 
  meta: PaginationMetaDto;
}
