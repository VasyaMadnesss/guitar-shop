import {
  GuitarProduct,
  generateRandomId,
  getRandomInteger,
  generateRandomString,
  getRandomArrayValue,
  StringCount,
  GuitarType,
} from '@guitar-shop/shared';

const PRICE_LOWEND = 0;
const PRICE_HIGHEND = 60000;

const guitarTypes: Record<GuitarType, StringCount[]> = {
  акустика: [6, 7, 12],
  укулеле: [4],
  электро: [4, 6, 7],
};

const guitarStringCounts = [4, 6, 7, 12];

const guitarDescriptions = [
  'Классическая гитара с кедровой декой и матовой отделкой',
  'Электрогитара с хамбакерами, идеальна для рока',
  'Дредноут с ярким звучанием для ритм-секции',
  'Полуакустика с резонаторными отверстиями f-образной формы',
  'Бас-гитара 4-струнная с активной электроникой',
  'Укулеле сопрано с нейлоновыми струнами для начинающих',
];

const guitarNames = [
  'Stratocaster',
  'Telecaster',
  'Les Paul',
  'SG Standard',
  'Jazzmaster',
  'Flying V',
  'Explorer',
  'Mustang',
  'ES-335',
  'Firebird',
];

const photos = [
  '/img/content/catalog-product-1.png',
  '/img/content/catalog-product-2.png',
  '/img/content/catalog-product-3.png',
  '/img/content/catalog-product-4.png',
  '/img/content/catalog-product-5.png',
  '/img/content/catalog-product-6.png',
  '/img/content/catalog-product-7.png',
  '/img/content/catalog-product-8.png',
];

function getGuitarType(stringCount: StringCount): GuitarType {
  const types: GuitarType[] = [];

  for (const [type, counts] of Object.entries(guitarTypes)) {
    if (counts.includes(stringCount)) {
      types.push(type as GuitarType);
    }
  }

  return types[0];
}

const productValuesHandler = {
  create: {
    addedDate: () => new Date().toISOString(),
    article: () => generateRandomString(),
    description: () => getRandomArrayValue(guitarDescriptions),
    guitarType: (stringCount: StringCount) => getGuitarType(stringCount),
    id: () => generateRandomId(),
    name: () => getRandomArrayValue(guitarNames),
    photo: () => getRandomArrayValue(photos),
    price: () => getRandomInteger(PRICE_LOWEND, PRICE_HIGHEND),
    stringCount: () => getRandomArrayValue(guitarStringCounts) as StringCount,
  },
};

const generateProduct = (): GuitarProduct => {
  const stringCount = productValuesHandler.create.stringCount();
  return {
    addedDate: productValuesHandler.create.addedDate(),
    article: productValuesHandler.create.article(),
    descriptipn: productValuesHandler.create.description(),
    guitarType: productValuesHandler.create.guitarType(stringCount),
    id: productValuesHandler.create.id(),
    name: productValuesHandler.create.name(),
    photo: productValuesHandler.create.photo(),
    price: productValuesHandler.create.price(),
    stringCount,
  };
};

export function generateProducts(count = 7) {
  const products: GuitarProduct[] = [];
  for (let i = 0; i < count; i++) {
    products.push(generateProduct());
  }
  return products;
}
