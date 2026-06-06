import { Controller, Get } from '@nestjs/common';
import { LeetcodeService } from './leetcode.service';

@Controller('leetcode')
export class LeetcodeController {
  constructor(private readonly leetcodeService: LeetcodeService) {}

  @Get('dsa')
  async getDSAStats() {
    return this.leetcodeService.getDSAStats();
  }
}
