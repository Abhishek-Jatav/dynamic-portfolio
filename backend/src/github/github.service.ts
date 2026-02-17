import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { GitHub } from './github.schema';

@Injectable()
export class GithubService {
  private readonly username = 'Abhishek-Jatav';
  private readonly baseUrl = 'https://api.github.com';

  // 24 hours in milliseconds
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000;

  constructor(
    private readonly httpService: HttpService,

    @InjectModel(GitHub.name)
    private readonly githubModel: Model<GitHub>,
  ) {}

  // 🔥 Fetch profile from GitHub API
  private async fetchProfileFromGithub() {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/users/${this.username}`),
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

  // ⏳ Cache check
  private isCacheExpired(lastFetchedAt: Date) {
    const now = Date.now();
    const lastTime = new Date(lastFetchedAt).getTime();
    return now - lastTime > this.CACHE_DURATION;
  }

  /**
   * ✅ GET /github/profile
   * Returns saved DB data.
   * If missing/expired -> fetch fresh and update DB.
   */
  async getProfile() {
    let doc = await this.githubModel.findOne({ type: 'profile' });

    // If no data OR expired -> refresh
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

    // ✅ Safety check (fixes TS18047)
    if (!doc) {
      throw new Error('GitHub profile could not be loaded');
    }

    return doc.data;
  }
}
