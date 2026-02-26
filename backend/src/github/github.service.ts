import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { GitHub, GitHubDocument } from './github.schema';

@Injectable()
export class GithubService {
  private readonly username = 'Abhishek-Jatav';
  private readonly baseUrl = 'https://api.github.com';
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  constructor(
    private readonly httpService: HttpService,
    @InjectModel(GitHub.name)
    private readonly githubModel: Model<GitHubDocument>,
  ) {}

  private async fetchProfileFromGithub() {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/users/${this.username}`, {
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'nestjs-app',
        },
      }),
    );

    return {
      username: response.data.login,
      name: response.data.name,
      avatar: response.data.avatar_url,
      bio: response.data.bio,
      followers: response.data.followers,
      following: response.data.following,
      publicRepos: response.data.public_repos,
      profileUrl: response.data.html_url,
      joinedAt: response.data.created_at,
    };
  }

  private isCacheExpired(lastFetchedAt?: Date) {
    if (!lastFetchedAt) return true;
    return Date.now() - new Date(lastFetchedAt).getTime() > this.CACHE_DURATION;
  }

  async getProfile() {
    let doc = await this.githubModel.findOne({ type: 'profile' }).exec();

    if (!doc || this.isCacheExpired(doc.lastFetchedAt)) {
      try {
        const freshData = await this.fetchProfileFromGithub();

        doc = await this.githubModel
          .findOneAndUpdate(
            { type: 'profile' },
            {
              type: 'profile',
              data: freshData,
              lastFetchedAt: new Date(),
            },
            { upsert: true, new: true },
          )
          .exec();

        if (!doc) {
          throw new InternalServerErrorException(
            'Failed to update GitHub profile',
          );
        }

        return doc.data;
      } catch (error) {
        console.error('GitHub API failed:', error);

        // 🔥 Fallback to old DB data
        if (doc) return doc.data;

        throw new InternalServerErrorException(
          'GitHub API failed and no cached data available',
        );
      }
    }

    return doc.data;
  }
}
