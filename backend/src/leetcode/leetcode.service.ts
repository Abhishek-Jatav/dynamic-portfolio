import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Leetcode, LeetcodeDocument } from './leetcode.schema';

interface LeetCodeStatsItem {
  difficulty: string;
  count: number;
}

interface LeetCodeResponse {
  data: {
    matchedUser: {
      username: string;
      submitStatsGlobal: {
        acSubmissionNum: LeetCodeStatsItem[];
      };
    } | null;
  };
}

@Injectable()
export class LeetcodeService {
  private readonly username = 'abhidel44';
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24h

  constructor(
    @InjectModel(Leetcode.name)
    private readonly leetcodeModel: Model<LeetcodeDocument>,
  ) {}

  private isCacheExpired(lastFetchedAt?: Date): boolean {
    if (!lastFetchedAt) return true;
    return Date.now() - new Date(lastFetchedAt).getTime() > this.CACHE_DURATION;
  }

  private async fetchFromLeetcode() {
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

    const response = await axios.post<LeetCodeResponse>(
      'https://leetcode.com/graphql',
      {
        query,
        variables: { username: this.username },
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    const matchedUser = response.data.data.matchedUser;

    if (!matchedUser) {
      throw new InternalServerErrorException('LeetCode user not found');
    }

    const stats = matchedUser.submitStatsGlobal.acSubmissionNum;

    const findCount = (difficulty: string): number =>
      stats.find((s) => s.difficulty === difficulty)?.count ?? 0;

    return {
      username: matchedUser.username,
      totalSolved: findCount('All'),
      easySolved: findCount('Easy'),
      mediumSolved: findCount('Medium'),
      hardSolved: findCount('Hard'),
      lastUpdated: new Date().toISOString(),
    };
  }

  async getStats() {
    let doc = await this.leetcodeModel.findOne({ type: 'stats' }).exec();

    if (!doc || this.isCacheExpired(doc.lastFetchedAt)) {
      try {
        const freshData = await this.fetchFromLeetcode();

        doc = await this.leetcodeModel
          .findOneAndUpdate(
            { type: 'stats' },
            {
              type: 'stats',
              data: freshData,
              lastFetchedAt: new Date(),
            },
            { upsert: true, new: true },
          )
          .exec();

        if (!doc) {
          throw new InternalServerErrorException(
            'Failed to update LeetCode stats',
          );
        }

        return doc.data;
      } catch (error) {
        console.error('LeetCode API failed:', error);

        // Fallback to cached DB data
        if (doc) return doc.data;

        throw new InternalServerErrorException(
          'LeetCode API failed and no cached data available',
        );
      }
    }

    return doc.data;
  }
}
