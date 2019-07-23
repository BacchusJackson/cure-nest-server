import { Module } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { ClinicController } from './clinic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicEntity } from './clinic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClinicEntity])],
  providers: [ClinicService],
  controllers: [ClinicController]
})
export class ClinicModule { }
