import { ApiProperty } from '@nestjs/swagger';
import { CoreOutput } from './output.dto';

export class PaginationInput {
  @ApiProperty({ description: '페이지 번호' })
  page: number;
  @ApiProperty({ description: '표시할 리스트 수' })
  pageSize: number;
  @ApiProperty({ description: '검색 타입', required: false })
  searchType?: string;
  @ApiProperty({ description: '검색값', required: false })
  searchValue?: string;
}

export class PaginationOutput extends CoreOutput {
  @ApiProperty({ description: '전체 페이지 수', required: false })
  totalPage?: number;
  @ApiProperty({ description: '전체 리스트 수', required: false })
  totalResult?: number;
  @ApiProperty({ description: '검색 타입', required: false })
  searchType?: string;
  @ApiProperty({ description: '검색값', required: false })
  searchValue?: string;
}
