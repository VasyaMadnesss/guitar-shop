import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { PrismaClient } from '@guitar-shop/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // используем более безопасный подход
    // prisma не типизирована под событие beforeExit
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
