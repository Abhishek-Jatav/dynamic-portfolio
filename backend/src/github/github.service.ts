import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GithubService {
  private readonly username = 'Abhishek-Jatav';
  private readonly baseUrl = 'https://api.github.com';

  constructor(private readonly httpService: HttpService) {}

  async getProfile() {
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

  async getRepos() {
    const response = await firstValueFrom(
      this.httpService.get(
        `${this.baseUrl}/users/${this.username}/repos?per_page=100`,
      ),
    );

    return response.data
      .filter((repo: any) => !repo.fork && repo.description)
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
      .map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        language: repo.language,
        repoUrl: repo.html_url,
      }));
  }
}
