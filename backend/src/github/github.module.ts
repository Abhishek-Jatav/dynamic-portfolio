import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import { GithubController } from './github.controller';
import { GithubService } from './github.service';

import { GitHub, GitHubSchema } from './github.schema';

@Module({
  imports: [
    HttpModule,

    // ✅ This registers GitHubModel for dependency injection
    MongooseModule.forFeature([{ name: GitHub.name, schema: GitHubSchema }]),
  ],
  controllers: [GithubController],
  providers: [GithubService],
})
export class GithubModule {}
