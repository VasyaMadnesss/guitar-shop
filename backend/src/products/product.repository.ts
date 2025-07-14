import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity.js';
import { ProductFactory } from './product.factory.js';
import { PrismaService } from '@guitar-shop/prisma';
import { Product, SortBy, SortOrder, GuitarType } from '../types/types.js';
import { Prisma } from '@guitar-shop/prisma';

@Injectable()
export class ProductRepository {
  constructor(
    private entityFactory: ProductFactory,
    private client: PrismaService
  ) {}

  public async isArticleExists(article: string): Promise<boolean> {
    const count = await this.client.product.count({
      where: { article },
    });
    return count > 0;
  }

  public async findById(id: string): Promise<ProductEntity | null> {
    const document = await this.client.product.findFirst({
      where: { id },
    });

    if (!document) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { createdAt, updatedAt, price, addedDate, ...data } = document;
    const product: Product = {
      price: price.toNumber(),
      addedDate: addedDate.toString(),
      ...data,
    };

    return this.entityFactory.create(product);
  }

  public async delete(entity: ProductEntity) {
    const { id } = entity;
    await this.client.product.delete({
      where: { id }
    });
  }

  public async findWithFilters({
    page = 1,
    limit = 7,
    sortBy = SortBy.AddedDate,
    sortOrder = SortOrder.Desc,
    guitarTypes,
    stringCount,
  }: {
    page?: number;
    limit?: number;
    sortBy?: SortBy;
    sortOrder?: SortOrder;
    guitarTypes?: GuitarType[];
    stringCount?: number[];
  }) {
    const skip = (page - 1) * limit;
    const where: Prisma.ProductWhereInput = {};
    const orderBy: Prisma.ProductOrderByWithRelationInput = {};

    if (guitarTypes && guitarTypes.length > 0) {
      where.guitarType = { in: guitarTypes };
    }

    if (stringCount && stringCount.length > 0) {
      where.stringCount = { in: stringCount };
    }

    if (sortBy === SortBy.Price) {
      orderBy.price = sortOrder;
    } else {
      orderBy.addedDate = sortOrder;
    }

    const [productsDb, totalCount] = await Promise.all([
      this.client.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      this.client.product.count({ where }),
    ]);

    const entities = productsDb.map((product) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { createdAt, updatedAt, addedDate, ...data } = product;
      return this.entityFactory.create({
        ...data,
        addedDate: addedDate.toISOString(),
        price: product.price.toNumber(),
      });
    });

    const products = entities.map((entity) => entity.toPOJO());

    return {
      products,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      itemsPerPage: limit,
      totalItems: totalCount,
    };
  }

  public async save(entity: ProductEntity): Promise<ProductEntity> {
    const entityPOJO = entity.toPOJO();

    const product = await this.client.product.create({
      data: {
        article: entityPOJO.article,
        description: entityPOJO.description,
        guitarType: entityPOJO.guitarType,
        name: entityPOJO.name,
        photo: entityPOJO.photo,
        price: entityPOJO.price,
        stringCount: entityPOJO.stringCount,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { createdAt, updatedAt, price, addedDate, ...data } = product;
    const newEntityPOJO = {
      ...data,
      price: price.toNumber(),
      addedDate: addedDate.toISOString(),
    };

    return this.entityFactory.create(newEntityPOJO);
  }

  public async update(entity: ProductEntity): Promise<void> {
    const entityPOJO = entity.toPOJO();
    const existingProduct = await this.findById(entityPOJO.id);
    if (existingProduct) {
      await this.client.product.update({
        where: { id: entityPOJO.id },
        data: {
          name: entityPOJO.name,
          description: entityPOJO.description,
          photo: entityPOJO.photo,
          guitarType: entityPOJO.guitarType,
          article: entityPOJO.article,
          stringCount: entityPOJO.stringCount,
          price: entityPOJO.price,
        },
      });
    }
  }
}
