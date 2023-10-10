import { Body, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobPosting } from './entity/job-posting.entity';
import { ILike, Repository } from 'typeorm';
import {
  CreateJobPostingInput,
  CreateJobPostingOutput,
} from './dto/create-job-posting.dto';
import { Company } from 'src/companies/entity/company.entity';
import {
  EditJobPostingInput,
  EditJobPostingOutput,
} from './dto/edit-job-posting.dto';
import {
  DeleteJobPostingInput,
  DeleteJobPostingOutput,
} from './dto/delete-job-posting.dto';
import {
  SearchJobPostingInput,
  SearchJobPostingOutput,
} from './dto/search-job-posting.dto';

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

  async editJobPosting(
    @Body() editJobPostingInput: EditJobPostingInput,
  ): Promise<EditJobPostingOutput> {
    try {
      const exist = await this.jobPosting.findOne({
        where: { id: editJobPostingInput.id },
      });

      if (!exist) {
        return {
          ok: false,
          error: 'not found job posting',
        };
      }

      await this.jobPosting.save(
        this.jobPosting.create({
          id: exist.id,
          ...editJobPostingInput,
        }),
      );

      return {
        ok: true,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        ok: false,
        error: 'failed to edited job posting',
      };
    }
  }

  async deleteJobPosting({
    id,
  }: DeleteJobPostingInput): Promise<DeleteJobPostingOutput> {
    try {
      const exist = await this.jobPosting.findOne({
        where: { id },
      });

      if (!exist) {
        return {
          ok: false,
          error: 'not found job posting',
        };
      }

      await this.jobPosting.delete({ id: exist.id });

      return {
        ok: true,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        ok: false,
        error: 'failed to deleted job posting',
      };
    }
  }

  async searchJobPosting({
    page,
    pageSize,
    searchType,
    searchValue,
  }: SearchJobPostingInput): Promise<SearchJobPostingOutput> {
    try {
      const [jobPostings, totalResult] = await this.jobPosting.findAndCount({
        ...(searchType &&
          searchValue && {
            where: { [searchType]: ILike(`%${searchValue.trim()}%`) },
          }),
        skip: (page - 1) * pageSize,
        take: pageSize,
        order: {
          id: 'DESC',
        },
      });

      return {
        ok: true,
        result: jobPostings,
        totalPage: Math.ceil(totalResult / pageSize),
        totalResult,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        ok: false,
        error: 'failed to searched job posting',
      };
    }
  }
}
