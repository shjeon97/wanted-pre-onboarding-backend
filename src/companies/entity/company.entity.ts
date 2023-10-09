import { ApiProperty } from '@nestjs/swagger';
import { CoreEntity } from 'src/common/entity/core.entity';
import { Column, Entity } from 'typeorm';

@Entity('company')
export class Company extends CoreEntity {
  @ApiProperty({ description: '회사명' })
  @Column()
  name: string;

  @ApiProperty({ description: '국가' })
  @Column()
  country: string;

  @ApiProperty({ description: '지역' })
  @Column()
  region: string;
}
