import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  constructor() {
    // Construct a SQL adapter using the DATABASE_URL env var
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error([
        'DATABASE_URL environment variable is not set. Prisma needs a database connection.',
        'Example Postgres connection string: postgresql://user:password@localhost:5432/mydb',
        'Quick start with Docker: docker run --name pg -e POSTGRES_PASSWORD=pass -e POSTGRES_USER=user -e POSTGRES_DB=mydb -p 5432:5432 -d postgres',
        'Then set: export DATABASE_URL="postgresql://user:pass@localhost:5432/mydb"',
      ].join('\n'));
    }

    const adapter = new PrismaPg({ connectionString });
    // Provide the adapter so PrismaClient can initialize with the 'client' engine
    super({ adapter } as any);
  }
  async onModuleInit() {
    await this.$connect();
  }
}
