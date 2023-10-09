import { Body, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobPosting } from './entity/job-posting.entity';
import { Repository } from 'typeorm';
import {
  CreateJobPostingInput,
  CreateJobPostingOutput,
} from './dto/create-job-posting.dto';
import { Company } from 'src/companies/entity/company.entity';

@Injectable()
export class JobPostingsService {
  constructor(
    @InjectRepository(JobPosting)
    private readonly jobPosting: Repository<JobPosting>,
    @InjectRepository(Company)
    private readonly company: Repository<Company>,
  ) {}

  private readonly logger = new Logger(JobPostingsService.name);

  async createJobPosting(
    @Body() createJobPostingInput: CreateJobPostingInput,
  ): Promise<CreateJobPostingOutput> {
    try {
      const company = await this.company.findOne({
        where: { id: createJobPostingInput.companyId },
      });

      if (!company) {
        return {
          ok: false,
          error: 'not found company',
        };
      }

      await this.jobPosting.save(
        this.jobPosting.create({
          company,
          ...createJobPostingInput,
        }),
      );

      return {
        ok: true,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        ok: false,
        error: 'failed to create job posting',
      };
    }
  }
}
