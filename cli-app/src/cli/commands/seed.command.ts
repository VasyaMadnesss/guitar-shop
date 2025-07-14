import { Command } from './command.interface.js';
import { GuitarType, PrismaClient } from '@guitar-shop/prisma';
import * as bcrypt from 'bcrypt';

export class SeedCommand implements Command {
  private readonly prisma: PrismaClient;
  private readonly imageNames = [
    'catalog-product-0.png',
    'catalog-product-1.png',
    'catalog-product-2.png',
    'catalog-product-3.png',
    'catalog-product-4.png',
    'catalog-product-5.png',
    'catalog-product-6.png',
    'catalog-product-7.png',
    'catalog-product-8.png',
  ];

  constructor() {
    this.prisma = new PrismaClient();
  }

  public getName(): string {
    return '--seed';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try {
      await this.seedDatabase();
      console.log('Database seeded successfully!');
    } catch (error) {
      console.error('Error seeding database:', error);
      process.exit(1);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  private async seedDatabase() {

    await this.prisma.product.deleteMany();
    await this.prisma.user.deleteMany();

    const hashedPassword = await bcrypt.hash('admin', 10);
    await this.prisma.user.create({
      data: {
        name: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
      },
    });


    const guitarData = Array.from({ length: 30 }, (_, i) =>
      this.generateGuitarData(i)
    );

    for (const data of guitarData) {
      await this.prisma.product.create({ data });
    }
  }

  private generateGuitarData(index: number) {
    const guitarTypes = ['ELECTRO', 'ACOUSTIC', 'UKULELE'];
    const stringCounts = [4, 6, 7, 12];

    const guitarType = guitarTypes[Math.floor(Math.random() * guitarTypes.length)] as GuitarType;
    const stringCount = stringCounts[Math.floor(Math.random() * stringCounts.length)];

    return {
      name: `Гитара ${index + 1}`,
      description: `Отличная гитара ${index + 1} для начинающих и профессионалов`,
      photo: this.imageNames[index % this.imageNames.length],
      guitarType: guitarType,
      article: `GUITAR-${index + 1}-${Math.random().toString(36).substring(2, 7)}`,
      stringCount: stringCount,
      price: (Math.floor(Math.random() * 90000) + 1000).toString(), 
    };
  }
}
