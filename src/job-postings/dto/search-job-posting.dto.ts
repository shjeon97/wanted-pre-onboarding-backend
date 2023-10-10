import { ApiProperty } from '@nestjs/swagger';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dto/pagination.dto';
import { JobPosting } from '../entity/job-posting.entity';

export class SearchJobPostingInput extends PaginationInput {}

export class SearchJobPostingOutput extends PaginationOutput {
  @ApiProperty({ description: '채용공고 리스트' })
  result?: JobPosting[];
}
