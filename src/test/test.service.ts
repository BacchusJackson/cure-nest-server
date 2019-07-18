import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestEntity } from './test.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(TestEntity)
    private testRepository: Repository<TestEntity>
  ) { }
  async createTestRequest() {
    const sampleTest: Test = {
      name: "Test Two",
      created: new Date(),
      active: true
    }
    console.log('Creating Test...');

    const newTest = await this.testRepository.create(sampleTest);
    this.testRepository.save(newTest);
  }
}

export interface Test {
  id?: string;
  active?: boolean;
  created?: Date;
  name: string;

}