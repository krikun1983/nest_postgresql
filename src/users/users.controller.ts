import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.models';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  createUser(@Body() userDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(userDto);
  }

  @Get()
  getAllUser(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }
}
