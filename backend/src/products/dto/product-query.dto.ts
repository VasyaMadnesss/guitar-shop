import { IsEnum, IsNumber, IsOptional, IsArray, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { GuitarType, SortBy, SortOrder } from '../../types/types.js';

export class ProductQueryDto {
  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value, 10) : 1))
  @IsNumber()
  @Min(1)
  public page = 1;

  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value, 10) : 7))
  @IsNumber()
  @Min(1)
  public limit = 7;

  @IsOptional()
  @IsEnum(SortBy, { message: 'Допустимые значения: addedDate, price' })
  public sortBy: SortBy = SortBy.AddedDate;

  @IsOptional()
  @IsEnum(SortOrder, { message: 'Допустимые значения: asc, desc' })
  public sortOrder: SortOrder = SortOrder.Desc;

  @IsOptional()
  @Transform(({ value }) => (value ? value.split(',') : []))
  @IsArray()
  @IsEnum(GuitarType, { each: true })
  public guitarTypes: GuitarType[] = [];

  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return [];
    const arr = value.split(',').map(Number);
    return arr.some(Number.isNaN) ? [] : arr;
  })
  @IsArray()
  @IsNumber({}, { each: true })
  public stringCounts: number[] = [];
}
