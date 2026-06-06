import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { LeetcodeDSA, LeetcodeDSADocument } from './leetcode-dsa.schema';

@Injectable()
export class LeetcodeService {
  private readonly username = 'abhidel44';

  constructor(
    @InjectModel(LeetcodeDSA.name)
    private readonly dsaModel: Model<LeetcodeDSADocument>,
  ) {}

  // =========================
  // FETCH DSA DATA
  // =========================

  private async fetchDSA() {
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

    const response = await axios.post(
      'https://leetcode.com/graphql',
      {
        query,
        variables: { username: this.username },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const matchedUser = response.data?.data?.matchedUser;

    if (!matchedUser) {
      throw new Error('User not found');
    }

    const stats = matchedUser.submitStatsGlobal.acSubmissionNum;

    const findCount = (difficulty: string) =>
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

  // =========================
  // GET DSA STATS
  // =========================

  async getDSAStats() {
    try {
      const freshData = await this.fetchDSA();

      await this.dsaModel.findOneAndUpdate(
        { type: 'dsa' },
        {
          type: 'dsa',
          data: freshData,
          lastFetchedAt: new Date(),
        },
        { upsert: true },
      );

      return freshData;
    } catch (error) {
      console.error('LeetCode API failed:', error);

      const cached = await this.dsaModel.findOne({
        type: 'dsa',
      });

      if (cached) {
        return cached.data;
      }

      throw new InternalServerErrorException(
        'API failed and no cached DSA data available',
      );
    }
  }
}
