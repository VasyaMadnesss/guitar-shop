import { AuthUser } from '../types/types.js';
import { EntityFactory } from '../types/interfaces/entity-factory.interface.js';
import { UserEntity } from './user.entity.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserFactory implements EntityFactory<UserEntity> {
  public create(entityPlainData: AuthUser): UserEntity {
    const newEntity = new UserEntity(entityPlainData);
    return newEntity;
  }
}
