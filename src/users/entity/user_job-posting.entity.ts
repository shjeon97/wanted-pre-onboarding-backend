import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_jobPosting')
export class User_JobPosting {
  @ApiProperty({
    description: '유저 id',
  })
  @PrimaryGeneratedColumn()
  userId: number;

  @ApiProperty({
    description: '채용공고 id',
  })
  @PrimaryGeneratedColumn()
  jobPostingId: number;
}
