import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProjectModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';

import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { ContactModule } from './contact/contact.module';

import { LeetcodeModule } from './leetcode/leetcode.module';

import { HackerRankModule } from './hackerrank/hackerrank.module';

import { GithubModule } from './github/github.module';

import { HeroImagesModule } from './hero-image/hero-images.module';

import { VideosModule } from './videos/videos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),

    ProjectModule,

    AuthModule,

    ContactModule,

    LeetcodeModule,

    HackerRankModule,

    GithubModule,

    HeroImagesModule,

    VideosModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
