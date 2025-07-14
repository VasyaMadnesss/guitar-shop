import { Logger, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductController } from './products.controller';
import { ProductRepository } from './product.repository';
import { ProductFactory } from './product.factory';

@Module({
  providers: [ProductsService, ProductRepository, ProductFactory, Logger],
  controllers: [ProductController],
})
export class ProductsModule {}
