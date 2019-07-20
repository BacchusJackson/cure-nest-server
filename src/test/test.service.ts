import { Injectable } from '@nestjs/common';
import { getManager, getRepository } from "typeorm";
import { Test } from "./test.entity";
@Injectable()
export class TestService {
  constructor(
  ) { }
  async createTestRequest() {
    const sampleTest: TestDto = {
      name: "Test Five",
      created: new Date(),
      active: true
    }

    const testRepo = getRepository(Test);

    console.log(testRepo);

    await testRepo.save(sampleTest);

  }

}

export interface TestDto {
  id?: string;
  active?: boolean;
  created?: Date;
  name: string;

}