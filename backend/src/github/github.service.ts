import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { GitHub } from './github.schema';

@Injectable()
export class GithubService {
  private readonly username = 'Abhishek-Jatav';
  private readonly baseUrl = 'https://api.github.com';

  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000;

  constructor(
    private readonly httpService: HttpService,
    @InjectModel(GitHub.name)
    private readonly githubModel: Model<GitHub>,
  ) {}

  private async fetchProfileFromGithub() {
    try {
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
    } catch (error) {
      console.error('GitHub API error:', error?.response?.data || error);
      throw new InternalServerErrorException('Failed to fetch from GitHub API');
    }
  }

  private isCacheExpired(lastFetchedAt: Date) {
    if (!lastFetchedAt) return true;

    const now = Date.now();
    const lastTime = new Date(lastFetchedAt).getTime();
    return now - lastTime > this.CACHE_DURATION;
  }

  async getProfile() {
    try {
      let doc = await this.githubModel.findOne({ type: 'profile' });

      if (!doc || this.isCacheExpired(doc.lastFetchedAt)) {
        const profile = await this.fetchProfileFromGithub();

        doc = await this.githubModel.findOneAndUpdate(
          { type: 'profile' },
          {
            type: 'profile',
            data: profile,
            lastFetchedAt: new Date(),
          },
          { upsert: true, new: true },
        );
      }

      if (!doc) {
        throw new InternalServerErrorException(
          'GitHub profile could not be loaded',
        );
      }

      return doc.data;
    } catch (error) {
      console.error('Service error:', error);
      throw new InternalServerErrorException('Failed to get GitHub profile');
    }
  }
}
