import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  SupportForJobPostingInput,
  SupportForJobPostingOutput,
} from './dto/support-for-job-posting.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: '채용공고 지원' })
  @ApiResponse({ type: SupportForJobPostingOutput })
  @Post()
  async createUser(
    @Body() supportForJobPostingInput: SupportForJobPostingInput,
  ): Promise<SupportForJobPostingOutput> {
    return this.userService.supportForJobPosting(supportForJobPostingInput);
  }
}
