import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  LeetcodeDSA,
  LeetcodeDSADocument,
} from './leetcode-dsa.schema';

import {
  LeetcodeSQL,
  LeetcodeSQLDocument,
} from './leetcode-sql.schema';

@Injectable()
export class LeetcodeService {
  private readonly username = 'abhidel44';
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24h

  constructor(
    @InjectModel(LeetcodeDSA.name)
    private readonly dsaModel: Model<LeetcodeDSADocument>,

    @InjectModel(LeetcodeSQL.name)
    private readonly sqlModel: Model<LeetcodeSQLDocument>,
  ) {}

  // =========================
  // Cache checker
  // =========================

  private isCacheExpired(lastFetchedAt?: Date): boolean {
    if (!lastFetchedAt) return true;

    return Date.now() - new Date(lastFetchedAt).getTime() > this.CACHE_DURATION;
  }

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
        headers: { 'Content-Type': 'application/json' },
      },
    );

    const matchedUser = response.data?.data?.matchedUser;

    if (!matchedUser) {
      throw new InternalServerErrorException('LeetCode user not found');
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

  async getDSAStats() {
    let doc = await this.dsaModel.findOne({ type: 'dsa' }).exec();

    if (!doc || this.isCacheExpired(doc.lastFetchedAt)) {
      try {
        const freshData = await this.fetchDSA();

        doc = await this.dsaModel
          .findOneAndUpdate(
            { type: 'dsa' },
            {
              type: 'dsa',
              data: freshData,
              lastFetchedAt: new Date(),
            },
            { upsert: true, new: true },
          )
          .exec();

        if (!doc) {
          throw new InternalServerErrorException(
            'Failed to update LeetCode DSA stats',
          );
        }

        return doc.data;
      } catch (error) {
        console.error('LeetCode DSA API failed:', error);

        if (doc) return doc.data;

        throw new InternalServerErrorException(
          'LeetCode API failed and no cached DSA data available',
        );
      }
    }

    return doc.data;
  }

  // =========================
  // FETCH SQL DATA
  // =========================

  private async fetchSQL() {
    const query = `
    query sqlProblems {
      problemsetQuestionList(
        categorySlug: ""
        limit: 200
        skip: 0
        filters: { tags: ["database"] }
      ) {
        questions {
          difficulty
        }
      }
    }
  `;

    const response = await axios.post(
      'https://leetcode.com/graphql',
      { query },
      { headers: { 'Content-Type': 'application/json' } },
    );

    const questions = response.data.data.problemsetQuestionList.questions;

    let easy = 0;
    let medium = 0;
    let hard = 0;

    for (const q of questions) {
      if (q.difficulty === 'Easy') easy++;
      if (q.difficulty === 'Medium') medium++;
      if (q.difficulty === 'Hard') hard++;
    }

    return {
      username: this.username,
      totalSolved: easy + medium + hard,
      easySolved: easy,
      mediumSolved: medium,
      hardSolved: hard,
      lastUpdated: new Date().toISOString(),
    };
  }

  async getSQLStats() {
    let doc = await this.sqlModel.findOne({ type: 'sql' }).exec();

    if (!doc || this.isCacheExpired(doc.lastFetchedAt)) {
      try {
        const freshData = await this.fetchSQL();

        doc = await this.sqlModel
          .findOneAndUpdate(
            { type: 'sql' },
            {
              type: 'sql',
              data: freshData,
              lastFetchedAt: new Date(),
            },
            { upsert: true, new: true },
          )
          .exec();

        if (!doc) {
          throw new InternalServerErrorException(
            'Failed to update LeetCode SQL stats',
          );
        }

        return doc.data;
      } catch (error) {
        console.error('LeetCode SQL API failed:', error);

        if (doc) return doc.data;

        throw new InternalServerErrorException(
          'LeetCode API failed and no cached SQL data available',
        );
      }
    }

    return doc.data;
  }
}
