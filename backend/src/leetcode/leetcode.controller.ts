import { Controller, Get } from '@nestjs/common';
import { LeetcodeService } from './leetcode.service';

@Controller('leetcode')
export class LeetcodeController {
  constructor(private readonly leetcodeService: LeetcodeService) {}

  @Get('stats')
  async getLeetcodeStats() {
    return this.leetcodeService.getStats();
  }
}
