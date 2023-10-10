import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { JobPostingsService } from './job-postings.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateJobPostingInput,
  CreateJobPostingOutput,
} from './dto/create-job-posting.dto';
import {
  EditJobPostingInput,
  EditJobPostingOutput,
} from './dto/edit-job-posting.dto';
import {
  DeleteJobPostingInput,
  DeleteJobPostingOutput,
} from './dto/delete-job-posting.dto';

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

  @ApiOperation({ summary: '채용공고 수정' })
  @ApiResponse({ type: EditJobPostingOutput })
  @Patch()
  async editJobPosting(
    @Body() editJobPostingInput: EditJobPostingInput,
  ): Promise<EditJobPostingOutput> {
    return this.jobPostingsService.editJobPosting(editJobPostingInput);
  }

  @ApiOperation({ summary: '채용공고 삭제' })
  @ApiResponse({ type: DeleteJobPostingOutput })
  @Delete(':id')
  async deleteJobPosting(
    @Param() deleteJobPostingInput: DeleteJobPostingInput,
  ): Promise<DeleteJobPostingOutput> {
    return this.jobPostingsService.deleteJobPosting(deleteJobPostingInput);
  }
}
