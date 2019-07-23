import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicEntity } from './clinic.entity';
import { Repository } from 'typeorm';
import { ClinicDTO } from './clinic.dto';

@Injectable()
export class ClinicService {
  constructor(
    @InjectRepository(ClinicEntity)
    private clinicRepository: Repository<ClinicEntity>
  ) { }

  async createClinic(newClinic: ClinicDTO) {

    const clinic = await this.clinicRepository.create(newClinic);
    await this.clinicRepository.save(clinic);

    return clinic.toResponseObject();

  }

  async readAllClinics() {
    const clinics = await this.clinicRepository.find({ where: { active: true } });

    return clinics.map(clinic => clinic.toResponseObject());
  }
  async readAllClinicsWithDeleted() {
    const clinics = await this.clinicRepository.find();

    return clinics.map(clinic => clinic.toResponseObject());
  }

  async updateClinic(clinicID: string, updatedClinic: Partial<ClinicDTO>) {
    let clinic = await this.clinicRepository.findOne({ where: { id: clinicID } });

    if (!clinic) {
      throw new HttpException('Clinic Not Found', HttpStatus.NOT_FOUND);
    }

    await this.clinicRepository.update({ id: clinicID }, updatedClinic);

    clinic = await this.clinicRepository.findOne({ where: { id: clinicID } });

    return clinic.toResponseObject();
  }

  async deleteClinic(clinicID: string) {
    const clinic = await this.clinicRepository.findOne({ where: { id: clinicID } });

    if (!clinic) {
      throw new HttpException('Clinic Not Found', HttpStatus.NOT_FOUND);
    }

    await this.clinicRepository.update({ id: clinicID }, { active: false });

    return { success: true };

  }

  async restoreClinic(clinicID: string) {
    const clinic = await this.clinicRepository.findOne({ where: { id: clinicID } });

    if (!clinic) {
      throw new HttpException('Clinic Not Found', HttpStatus.NOT_FOUND);
    }

    await this.clinicRepository.update({ id: clinicID }, { active: true });

    return {success: true};
  }
}
