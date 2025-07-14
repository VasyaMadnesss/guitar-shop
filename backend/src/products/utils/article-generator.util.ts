import { GuitarType } from '../../types/types.js';
import { getRandomInteger } from '@guitar-shop/shared';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const ARTICLE_MIN_LENGTH = 5;
const ARTICLE_MAX_LENGTH = 40;

export function generateArticle(guitarType: GuitarType): string {
  const length = getRandomInteger(ARTICLE_MIN_LENGTH, ARTICLE_MAX_LENGTH);

  let article = '';

  for (let i = 0; i < length; i++) {
    article += LETTERS.charAt(getRandomInteger(0, LETTERS.length - 1));
  }

  const prefixMap = {
    [GuitarType.Electro]: 'EL-',
    [GuitarType.Acoustic]: 'AC-',
    [GuitarType.Ukulele]: 'UK-',
  };

  const generatedArticle = prefixMap[guitarType] + article;
  if (generatedArticle.length > 40) {
    generatedArticle.slice(0, prefixMap[guitarType].length);
  }

  return generatedArticle;
}
