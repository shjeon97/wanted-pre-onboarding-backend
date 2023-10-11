import { Body, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobPosting } from './entity/job-posting.entity';
import { ILike, Not, Repository } from 'typeorm';
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
import {
  DetailJobPostingInput,
  DetailJobPostingOutput,
} from './dto/detail-job-posting.dto';

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
            where: {
              ...(searchType === 'name' ||
              searchType === 'country' ||
              searchType === 'region'
                ? {
                    company: {
                      [searchType]: ILike(`%${searchValue.trim()}%`),
                    },
                  }
                : {
                    [searchType]: ILike(`%${searchValue.trim()}%`),
                  }),
            },
          }),
        relations: ['company'],
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: ['id', 'company', 'position', 'compensation', 'skill'],
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

  async detailJobPosting({
    id,
  }: DetailJobPostingInput): Promise<DetailJobPostingOutput> {
    try {
      const exist = await this.jobPosting.findOne({
        where: { id },
        relations: ['company'],
        select: [
          'id',
          'company',
          'position',
          'compensation',
          'skill',
          'detail',
        ],
      });

      if (!exist) {
        return {
          ok: false,
          error: 'not found job posting',
        };
      }

      const otherJobPostings = await this.jobPosting.find({
        where: {
          id: Not(id),
          company: {
            id: exist.company.id,
          },
        },
        select: ['id'],
      });

      const otherJobPostingIds: number[] = [];

      if (otherJobPostings.length > 0) {
        otherJobPostings.map((otherJobPosting) =>
          otherJobPostingIds.push(otherJobPosting.id),
        );
      }

      return {
        ok: true,
        jobPosting: exist,
        otherJobPostingIds,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        ok: false,
        error: 'failed to get detail job posting',
      };
    }
  }
}
