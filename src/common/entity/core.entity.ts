import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class CoreEntity {
  @ApiProperty({ description: '고유키' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '생성일' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: '마지막 수정일' })
  @UpdateDateColumn()
  updatedAt: Date;
}
