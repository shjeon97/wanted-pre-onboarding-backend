import { PickType } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dto/output.dto';
import { JobPosting } from '../entity/job-posting.entity';

export class CreateJobPostingInput extends PickType(JobPosting, [
  'companyId',
  'position',
  'compensation',
  'detail',
  'skill',
] as const) {}

export class CreateJobPostingOutput extends CoreOutput {}
