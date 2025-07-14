import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { PrismaModule } from '@guitar-shop/prisma';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module.js';

@Module({
  imports: [ConfigModule, PrismaModule, AuthModule, UsersModule, ProductsModule],
})
export class AppModule {}
