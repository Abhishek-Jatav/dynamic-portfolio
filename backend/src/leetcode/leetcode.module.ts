import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeetcodeService } from './leetcode.service';
import { LeetcodeController } from './leetcode.controller';
import { Leetcode, LeetcodeSchema } from './leetcode.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Leetcode.name, schema: LeetcodeSchema },
    ]),
  ],
  controllers: [LeetcodeController],
  providers: [LeetcodeService],
})
export class LeetcodeModule {}
