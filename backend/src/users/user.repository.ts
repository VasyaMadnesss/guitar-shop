import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity.js';
import { UserFactory } from './user.factory.js';
import { PrismaService } from '@guitar-shop/prisma';
import { AuthUser } from '../types/types.js';

@Injectable()
export class UserRepository {
  constructor(
    private entityFactory: UserFactory,
    private client: PrismaService
  ) {}

  public async findById(id: string): Promise<UserEntity | null> {
    const document = await this.client.user.findFirst({
      where: { id },
    });

    if (!document) {
      return null;
    }

    const { password: passwordHash, ...data } = document;
    const user: AuthUser = { passwordHash, ...data };

    return this.entityFactory.create(user);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const document = await this.client.user.findUnique({
      where: { email },
    });
    if (!document) {
      return null;
    }
    const { password: passwordHash, ...data } = document;
    const user: AuthUser = { passwordHash, ...data };

    return this.entityFactory.create(user);
  }

  public async save(entity: UserEntity): Promise<void> {
    const entityPOJO = entity.toPOJO();
    await this.client.user.create({
      data: {
        name: entityPOJO.name,
        email: entityPOJO.email,
        password: entityPOJO.passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
