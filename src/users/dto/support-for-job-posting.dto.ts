import { ApiProperty } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dto/output.dto';

export class SupportForJobPostingInput {
  @ApiProperty({ description: '지원자 id' })
  userId: number;

  @ApiProperty({ description: '채용공고 id' })
  jobPostingId: number;
}

export class SupportForJobPostingOutput extends CoreOutput {}
