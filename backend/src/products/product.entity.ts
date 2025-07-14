import { Entity } from '../types/base/entity.js';
import { $Enums } from '@guitar-shop/prisma';
import { StorableEntity } from '../types/interfaces/storable-entity.interface.js';
import { Product } from '../types/types.js';

export class ProductEntity extends Entity implements StorableEntity<Product> {
  public name: string;
  public description: string;
  public addedDate: string;
  public photo: string;
  public guitarType: $Enums.GuitarType;
  public article: string;
  public stringCount: number;
  public price: number;

  constructor(product) {
    super();
    this.populate(product);
  }

  public populate(product: Product): void {
    if (!product) {
      return;
    }
    this.id = product.id ?? '';
    this.name = product.name;
    this.addedDate = product.addedDate;
    this.article = product.article;
    this.description = product.description;
    this.guitarType = product.guitarType;
    this.photo = product.photo;
    this.price = product.price;
    this.stringCount = product.stringCount;
  }

  public toPOJO(): Product {
    return {
      id: this.id,
      addedDate: this.addedDate,
      article: this.article,
      description: this.description,
      guitarType: this.guitarType,
      name: this.name,
      photo: this.photo,
      price: this.price,
      stringCount: this.stringCount,
    };
  }
}
