import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './user.models';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RolesService) {}
  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('ADMIN');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll({ include: { all: true } });
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email }, include: { all: true } });
  }
}
