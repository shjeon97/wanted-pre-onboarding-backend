import { Module } from '@nestjs/common';
import { JobPostingsController } from './job-postings.controller';
import { JobPostingsService } from './job-postings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPosting } from './entity/job-posting.entity';
import { Company } from 'src/companies/entity/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobPosting, Company])],
  controllers: [JobPostingsController],
  providers: [JobPostingsService],
})
export class JobPostingsModule {}
