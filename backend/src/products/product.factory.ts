import { Product } from '../types/types.js';
import { EntityFactory } from '../types/interfaces/entity-factory.interface.js';
import { ProductEntity } from './product.entity.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductFactory implements EntityFactory<ProductEntity> {
  public create(entityPlainData: Product): ProductEntity {
    const newEntity = new ProductEntity(entityPlainData);
    return newEntity;
  }
}
