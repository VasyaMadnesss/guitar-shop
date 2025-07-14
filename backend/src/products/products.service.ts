import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ProductRepository } from './product.repository.js';
import { ProductCreateDto } from './dto/product-create.dto.js';
import { ProductFactory } from './product.factory.js';
import { ProductQueryDto } from './dto/product-query.dto.js';
import { ProductUpdateDto } from './dto/product-update.dto.js';
import { generateArticle } from './utils/article-generator.util.js';
import { ArticleGenerationFailedException } from './exceptions/article-generation-failed.exception.js';

@Injectable()
export class ProductsService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly factory: ProductFactory,
    private readonly logger: Logger
  ) {}

  private async createUniqueArticle(dto: ProductCreateDto) {
    let article = '';
    const MAX_ATTEMPTS = 10;
    let found = false;

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      article = generateArticle(dto.guitarType);
      if (!(await this.repository.isArticleExists(article))) {
        found = true;
        break;
      }
      this.logger.warn(`Коллизия артикула: ${article} (попытка ${attempt})`);
    }

    if (!found) {
      throw new ArticleGenerationFailedException(MAX_ATTEMPTS);
    }

    return article;
  }

  private async checkArticle(article) {
    return await this.repository.isArticleExists(article);
  }

  public async deleteOne(id: string) {
    const entity = await this.repository.findById(id);
    if(!entity) {
      throw new BadRequestException(`Товара с id: ${id} не существует`);
    }
    await this.repository.delete(entity);
  }

  public async findOne(id: string) {
    const entity = await this.repository.findById(id);
    if(!entity) {
      throw new BadRequestException(`Товара с id: ${id} не существует`);
    }
    return entity.toPOJO();
  }

  public async create(dto: ProductCreateDto, photoName: string) {
    const article = dto.article ?? this.createUniqueArticle(dto);
    if (await this.checkArticle(article)) {
      throw new ConflictException(`Артикул ${article} уже занят`);
    }
    const entityPOJO = {
      article,
      ...dto,
      photo: photoName,
      id: '',
      addedDate: new Date().toISOString(),
    };
    const entity = this.factory.create(entityPOJO);
    const createdEntity = await this.repository.save(entity);
    return createdEntity.toPOJO();
  }

  public async update(dto: ProductUpdateDto, photoName?: string) {
    const productUsedToUpdate = await this.repository.findById(dto.id);
    if (!productUsedToUpdate) {
      throw new BadRequestException(`Товара с id: ${dto.id} не существует`);
    }
    const existingPhotoString = productUsedToUpdate.photo;
    const photoString = photoName ? photoName : existingPhotoString;
    const entityPOJO = {
      ...dto,
      photo: photoString,
      addedDate: new Date().toISOString(),
    };
    const entity = this.factory.create(entityPOJO);
    await this.repository.update(entity);
  }

  public async findWithFilters(dto: ProductQueryDto) {
    const {
      page,
      limit,
      sortBy,
      sortOrder,
      guitarTypes,
      stringCounts,
    } = dto;
    const result = await this.repository.findWithFilters({
      page,
      limit,
      sortBy,
      sortOrder,
      guitarTypes,
      stringCount: stringCounts,
    });

    return result;
  }
}
