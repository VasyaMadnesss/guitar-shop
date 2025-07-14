import {
  IsString,
  IsEnum,
  IsNumber,
  Min,
  Max,
  Length,
  IsNotEmpty,
  IsUUID,
  Matches,
  IsOptional,
} from 'class-validator';
import { GuitarType } from '../../types/types.js';
import { Type } from 'class-transformer';

export class ProductUpdateDto {
  @IsUUID(4, { message: 'ID должен быть формата UUID v4' })
  @IsNotEmpty({ message: 'ID обязателен' })
  public id: string;

  @IsString({ message: 'Артикул должен быть строкой' })
  @Length(5, 40, { message: 'Артикул должен содержать 5-40 символов' })
  public article: string;

  @IsString({ message: 'Описание должно быть строкой' })
  @Length(20, 1024, { message: 'Описание должно содержать 20-1024 символа' })
  public description: string;

  @IsEnum(GuitarType, { message: 'Недопустимый тип гитары' })
  public guitarType: GuitarType;

  @IsString({ message: 'Наименование должно быть строкой' })
  @Length(10, 100, { message: 'Наименование должно содержать 10-100 символов' })
  public name: string;

  @IsOptional()
  @Matches(/\.(jpg|png)$/i, {
    message: 'Фото должно иметь расширение .jpg или .png',
  })
  public photoString?: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Цена должна быть числом' })
  @Min(100, { message: 'Минимальная цена: 100' })
  @Max(1000000, { message: 'Максимальная цена: 1000000' })
  @IsNotEmpty({ message: 'Цена обязательна' })
  public price: number;

  @Type(() => Number)
  @IsNotEmpty({ message: 'Количество струн обязательно' })
  public stringCount: number;
}
