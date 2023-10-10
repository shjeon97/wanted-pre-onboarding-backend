import { PickType } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dto/output.dto';
import { JobPosting } from '../entity/job-posting.entity';

export class DeleteJobPostingInput extends PickType(JobPosting, ['id']) {}

export class DeleteJobPostingOutput extends CoreOutput {}
