import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './user.models';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}
  async createUser(dto: CreateUserDto): Promise<User> {
    return await this.userRepository.create(dto);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
