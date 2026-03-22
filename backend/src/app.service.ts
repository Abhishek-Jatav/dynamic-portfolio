import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  getHello(): string {
    return 'Hello World!';
  }

  // Check if MongoDB is reachable
  async isDatabaseAlive(): Promise<boolean> {
    try {
      // Ensure db exists
      if (!this.connection?.db) {
        throw new Error('Database connection is not ready');
      }

      await this.connection.db.admin().ping();
      return true;
    } catch (err) {
      console.error('MongoDB ping failed:', err);
      return false;
    }
  }
}
