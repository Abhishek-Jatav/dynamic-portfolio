import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('ping')
  ping() {
    return {
      status: 'ok',
      message: 'pong 🏓',
      time: new Date().toISOString(),
    };
  }

  @Get('health')
  health() {
    return {
      status: 'healthy',
      uptime: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      service: 'dynamic-portfolio-backend',
    };
  }
}
