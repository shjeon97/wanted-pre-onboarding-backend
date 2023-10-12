import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { User_JobPosting } from './entity/user_job-posting.entity';
import { JobPosting } from 'src/job-postings/entity/job-posting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, User_JobPosting, JobPosting])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
