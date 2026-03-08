import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LeetcodeController } from './leetcode.controller';
import { LeetcodeService } from './leetcode.service';

import { LeetcodeDSA, LeetcodeDSASchema } from './leetcode-dsa.schema';

import { LeetcodeSQL, LeetcodeSQLSchema } from './leetcode-sql.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LeetcodeDSA.name, schema: LeetcodeDSASchema },
      { name: LeetcodeSQL.name, schema: LeetcodeSQLSchema },
    ]),
  ],
  controllers: [LeetcodeController],
  providers: [LeetcodeService],
})
export class LeetcodeModule {}
