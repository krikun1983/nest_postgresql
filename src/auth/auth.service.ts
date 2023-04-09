import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.models';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}
  async login(userDto: CreateUserDto): Promise<{ token: string }> {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto): Promise<{ token: string }> {
    const candidate = await this.usersService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException('Пользователь с таким email уже зарегистрирован', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcryptjs.hash(userDto.password, 5);
    const user = await this.usersService.createUser({ ...userDto, password: hashPassword });
    return this.generateToken(user);
  }

  async generateToken(user: User): Promise<{ token: string }> {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    const passwordEquals = await bcryptjs.compare(userDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Некорректный email или пароль' });
  }
}
