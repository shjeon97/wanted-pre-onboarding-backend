import { ApiProperty, PickType } from '@nestjs/swagger';
import { JobPosting } from '../entity/job-posting.entity';
import { CoreOutput } from 'src/common/dto/output.dto';

export class DetailJobPostingInput extends PickType(JobPosting, ['id']) {}

export class DetailJobPostingOutput extends CoreOutput {
  @ApiProperty({ description: '채용공고 세부정보', required: false })
  jobPosting?: JobPosting;

  @ApiProperty({
    description: '회사가 올린 다른 채용공고 Id 리스트',
    required: false,
  })
  otherJobPostingIds?: number[];
}
