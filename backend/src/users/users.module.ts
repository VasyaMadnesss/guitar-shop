import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository.js';
import { UserFactory } from './user.factory.js';


@Module({
  providers: [UserRepository, UserFactory],
  exports: [UserRepository],
})
export class UsersModule {}
