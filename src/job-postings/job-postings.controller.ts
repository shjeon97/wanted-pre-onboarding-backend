import { Body, Controller, Post } from '@nestjs/common';
import { JobPostingsService } from './job-postings.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateJobPostingInput,
  CreateJobPostingOutput,
} from './dto/create-job-posting.dto';

@ApiTags('job-postings')
@Controller('job-postings')
export class JobPostingsController {
  constructor(private readonly jobPostingsService: JobPostingsService) {}

  @ApiOperation({ summary: '채용공고 생성' })
  @ApiResponse({ type: CreateJobPostingOutput })
  @Post()
  async createJobPosting(
    @Body() createJobPostingInput: CreateJobPostingInput,
  ): Promise<CreateJobPostingOutput> {
    return this.jobPostingsService.createJobPosting(createJobPostingInput);
  }
}
