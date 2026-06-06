import { Controller, Get } from '@nestjs/common';
import { HackerRankService } from './hackerrank.service';

@Controller('hackerrank')
export class HackerRankController {
  constructor(private readonly hackerrankService: HackerRankService) {}

  @Get()
  async getStats() {
    return this.hackerrankService.getStats();
  }
}
