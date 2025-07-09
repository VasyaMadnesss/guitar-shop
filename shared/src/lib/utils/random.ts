export function getRandomInteger(min: number, max: number): number {
  if (min >= max) {
    throw new Error('Минимальное значение должно быть меньше максимального');
  }
  const int = Math.floor(Math.random() * (max - min + 1)) + min
  return Math.floor(int / 100) * 100;
}

export function getRandomArrayValue<T>(array: T[]): T {
  if (array.length === 0) {
    throw new Error('Массив не должен быть пустым');
  }
  return array[Math.floor(Math.random() * array.length)];
}

export function generateRandomId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function generateRandomString(length = 10): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
