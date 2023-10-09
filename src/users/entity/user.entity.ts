import { ApiProperty } from '@nestjs/swagger';
import { CoreEntity } from 'src/common/entity/core.entity';
import { JobPosting } from 'src/job-postings/entity/job-posting.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity('user')
export class User extends CoreEntity {
  @ApiProperty({ description: '이름' })
  @Column()
  name: string;

  @ApiProperty({ description: '지원한 채용공고' })
  @ManyToMany(() => JobPosting, { eager: true, nullable: true })
  @JoinTable({ name: 'user_jobPosting' })
  jobPostings?: JobPosting[];
}
