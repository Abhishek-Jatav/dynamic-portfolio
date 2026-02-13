import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { BlogsModule } from './blogs/blogs.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ContactModule } from './contact/contact.module';
import { LeetcodeModule } from './leetcode/leetcode.module';
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

    ProjectsModule,
    BlogsModule,
    AuthModule,
    ContactModule,
    LeetcodeModule,
    GithubModule,
    HeroImagesModule,
    VideosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
