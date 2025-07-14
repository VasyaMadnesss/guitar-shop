import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductCreateDto } from './dto/product-create.dto.js';
import { ProductsService } from './products.service.js';
import { ProductQueryDto } from './dto/product-query.dto.js';
import { ProductUpdateDto } from './dto/product-update.dto.js';
import { multerOptions } from '../config/multer.config.js';
import { FILE_UPLOAD_CONFIG } from '../config/file-upload.config.js';

@Controller('products')
@UseGuards(AuthGuard('jwt'))
export class ProductController {
  constructor(private readonly service: ProductsService) {}

  @Delete(':id')
  async deleteProduct(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new HttpException(
            'Неверный формат ID. Требуется UUID v4',
            HttpStatus.BAD_REQUEST
          ),
      })
    )
    id: string
  ) {
    return this.service.deleteOne(id);
  }

  @Get(':id')
  async getProduct(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new HttpException(
            'Неверный формат ID. Требуется UUID v4',
            HttpStatus.BAD_REQUEST
          ),
      })
    )
    id: string
  ) {
    return this.service.findOne(id);
  }

  @Get()
  async getProducts(@Query() query: ProductQueryDto) {
    return this.service.findWithFilters(query);
  }

  @Post()
  @UseInterceptors(FileInterceptor('photo', multerOptions))
  async createProduct(
    @Body() dto: ProductCreateDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: FILE_UPLOAD_CONFIG.MAX_SIZE }),
        ],
        fileIsRequired: true,
      })
    )
    photo: Express.Multer.File
  ) {
    return this.service.create(dto, photo.filename);
  }

  @Patch()
  @UseInterceptors(FileInterceptor('photo', multerOptions))
  async updateProduct(
    @Body() dto: ProductUpdateDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: FILE_UPLOAD_CONFIG.MAX_SIZE }),
        ],
        fileIsRequired: false,
      })
    )
    photo?: Express.Multer.File
  ) {
    return this.service.update(dto, photo?.filename);
  }
}
