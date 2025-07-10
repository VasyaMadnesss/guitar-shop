import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUser } from '../types/types.js';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import { UserRepository } from '../users/user.repository.js';
import { UserEntity } from '../users/user.entity.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async verifyUser(dto: LoginDto): Promise<UserEntity> {
    const { email, password } = dto;
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(
        `User with email ${email} does not exist`
      );
    }
    const isPasswordValid = user.comparePassword(password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect login or password');
    }
    return user;
  }

  async createAccessToken(entity: UserEntity) {
    const payload = entity.getJwtPayload();
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const { password, name, email } = createUserDto;
    const unregisteredUser: AuthUser = {
      id: '',
      email: email,
      name: name,
      passwordHash: '',
    };

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new ConflictException(`User with email ${email} is already exists`);
    }

    const user = await new UserEntity(unregisteredUser).setPassword(password);

    return user;
  }
}
