import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HackerRankController } from './hackerrank.controller';
import { HackerRankService } from './hackerrank.service';

import { HackerRank, HackerRankSchema } from './hackerrank.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: HackerRank.name,
        schema: HackerRankSchema,
      },
    ]),
  ],
  controllers: [HackerRankController],
  providers: [HackerRankService],
})
export class HackerRankModule {}
