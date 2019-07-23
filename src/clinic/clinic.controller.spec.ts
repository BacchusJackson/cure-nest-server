import { Test, TestingModule } from '@nestjs/testing';
import { ClinicController } from './clinic.controller';

describe('Clinic Controller', () => {
  let controller: ClinicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClinicController],
    }).compile();

    controller = module.get<ClinicController>(ClinicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
