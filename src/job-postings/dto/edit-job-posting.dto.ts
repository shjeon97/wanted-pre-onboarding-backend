import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dto/output.dto';
import { JobPosting } from '../entity/job-posting.entity';

export class EditJobPostingInput extends PartialType(
  PickType(JobPosting, ['compensation', 'detail', 'position', 'skill']),
) {
  @ApiProperty({ description: '채용공고 id' })
  id: number;
}

export class EditJobPostingOutput extends CoreOutput {}
