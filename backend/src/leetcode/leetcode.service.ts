import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LeetcodeService {
  private cache: any = null;
  private lastFetched = 0;
  private CACHE_TIME = 5 * 60 * 1000; // 5 minutes

  async getStats() {
    // Serve cached data if valid
    if (this.cache && Date.now() - this.lastFetched < this.CACHE_TIME) {
      return this.cache;
    }

    const query = `
      query userProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
      }
    `;

    const variables = {
      username: 'abhidel44',
    };

    const response = await axios.post(
      'https://leetcode.com/graphql',
      {
        query,
        variables,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const stats =
      response.data.data.matchedUser.submitStatsGlobal.acSubmissionNum;

    const formatted = {
      username: response.data.data.matchedUser.username,
      totalSolved: stats.find((s) => s.difficulty === 'All')?.count || 0,
      easySolved: stats.find((s) => s.difficulty === 'Easy')?.count || 0,
      mediumSolved: stats.find((s) => s.difficulty === 'Medium')?.count || 0,
      hardSolved: stats.find((s) => s.difficulty === 'Hard')?.count || 0,
      lastUpdated: new Date().toISOString(),
    };

    // Cache result
    this.cache = formatted;
    this.lastFetched = Date.now();

    return formatted;
  }
}
