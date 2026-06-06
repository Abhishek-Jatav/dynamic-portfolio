import { Injectable, InternalServerErrorException } from '@nestjs/common';

import axios from 'axios';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { HackerRank, HackerRankDocument } from './hackerrank.schema';

@Injectable()
export class HackerRankService {
  private readonly username = 'abhidel44';

  constructor(
    @InjectModel(HackerRank.name)
    private readonly hackerrankModel: Model<HackerRankDocument>,
  ) {}

  // =========================
  // FETCH HACKERRANK DATA
  // =========================

  private async fetchStats() {
    const url = `https://www.hackerrank.com/profile/${this.username}`;

    const response = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',

        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',

        'Accept-Language': 'en-US,en;q=0.9',

        Referer: 'https://www.google.com/',
      },
    });

    const html = response.data;

    // =========================
    // EXTRACT BADGES
    // =========================

    const badges = (html.match(/badge-card/g) || []).length;

    // =========================
    // EXTRACT SQL STARS
    // =========================

    let stars = 0;

    /**
     * Match section like:
     *
     * Sql
     * ★★
     *
     * or:
     *
     * Sql 2 stars
     */

    const sqlBlockMatch = html.match(/Sql[\s\S]{0,200}/i);

    if (sqlBlockMatch) {
      const sqlBlock = sqlBlockMatch[0];

      // First try direct number
      const directNumberMatch = sqlBlock.match(/([1-9])\s*stars?/i);

      if (directNumberMatch) {
        stars = Number(directNumberMatch[1]);
      } else {
        // Fallback → count star symbols
        const starSymbols = sqlBlock.match(/★/g) || [];

        stars = starSymbols.length;
      }
    }

    return {
      username: this.username,
      badges,
      stars,
      lastUpdated: new Date().toISOString(),
    };
  }

  // =========================
  // GET STATS
  // =========================

  async getStats() {
    try {
      const freshData = await this.fetchStats();

      await this.hackerrankModel.findOneAndUpdate(
        { type: 'hackerrank' },
        {
          type: 'hackerrank',
          data: freshData,
          lastFetchedAt: new Date(),
        },
        { upsert: true },
      );

      return freshData;
    } catch (error) {
      console.error('HackerRank scraping failed:', error.message);

      const cached = await this.hackerrankModel.findOne({
        type: 'hackerrank',
      });

      if (cached) {
        return cached.data;
      }

      throw new InternalServerErrorException('Failed to fetch HackerRank data');
    }
  }
}
