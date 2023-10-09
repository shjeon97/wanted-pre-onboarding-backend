import { ApiProperty } from '@nestjs/swagger';
import { CoreEntity } from 'src/common/entity/core.entity';
import { Company } from 'src/companies/entity/company.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';

@Entity('jobPosting')
export class JobPosting extends CoreEntity {
  @ApiProperty({ description: '회사 정보' })
  @ManyToOne(() => Company, { onDelete: 'CASCADE' })
  company: Company;

  @ApiProperty({ description: '회사 id' })
  @RelationId((jobPosting: JobPosting) => jobPosting.company)
  companyId: number;

  @ApiProperty({ description: '채용포지션' })
  @Column()
  position: string;

  @ApiProperty({ description: '채용보상금' })
  @Column()
  compensation: number;

  @ApiProperty({ description: '채용내용' })
  @Column()
  detail: string;

  @ApiProperty({ description: '사용기술' })
  @Column()
  skill: string;
}
