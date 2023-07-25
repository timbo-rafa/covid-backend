import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/dev')
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get()
  pingDatabase() {
    return this.appService.pingDatabase()
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
