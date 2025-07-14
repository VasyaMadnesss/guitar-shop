import { HttpException, HttpStatus } from '@nestjs/common';

export class ArticleGenerationFailedException extends HttpException {
  constructor(attempts: number) {
    super(
      `Не удалось сгенерировать уникальный артикул за ${attempts} попыток`,
      HttpStatus.TOO_MANY_REQUESTS
    );
  }
}
