import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { User_JobPosting } from './entity/user_job-posting.entity';
import { JobPosting } from 'src/job-postings/entity/job-posting.entity';
import {
  SupportForJobPostingInput,
  SupportForJobPostingOutput,
} from './dto/support-for-job-posting.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    @InjectRepository(User_JobPosting)
    private readonly user_jobPosting: Repository<User_JobPosting>,
    @InjectRepository(JobPosting)
    private readonly jobPosting: Repository<JobPosting>,
  ) {}
  private readonly logger = new Logger(UsersService.name);

  async supportForJobPosting(
    supportForJobPostingInput: SupportForJobPostingInput,
  ): Promise<SupportForJobPostingOutput> {
    try {
      const jobPosting = await this.jobPosting.findOne({
        where: { id: supportForJobPostingInput.jobPostingId },
      });

      if (!jobPosting) {
        return {
          ok: false,
          error: 'not found job posting',
        };
      }

      const exist = await this.user_jobPosting.findOne({
        where: {
          userId: supportForJobPostingInput.userId,
          jobPostingId: supportForJobPostingInput.jobPostingId,
        },
      });

      if (exist) {
        return {
          ok: false,
          error: 'already applied for a job posting',
        };
      }

      await this.user_jobPosting.save(
        this.user_jobPosting.create({
          userId: supportForJobPostingInput.userId,
          jobPostingId: supportForJobPostingInput.jobPostingId,
        }),
      );

      return {
        ok: true,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        ok: false,
        error: 'failed to support for job posting',
      };
    }
  }
}
