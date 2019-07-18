import { Controller, Post } from '@nestjs/common';
import { TestService } from "./test.service";

@Controller('test')
export class TestController {

    constructor(private readonly testService:TestService){}

    @Post()
    createTestRequest() {
        return this.testService.createTestRequest();
    }
}
