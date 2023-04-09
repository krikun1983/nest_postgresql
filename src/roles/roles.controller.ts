import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.model';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'Создание Роли' })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  createRole(@Body() roleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.createRole(roleDto);
  }

  @ApiOperation({ summary: 'Получение роли по значению' })
  @ApiResponse({ status: 200, type: Role })
  @Get('/:value')
  getRoleByValue(@Param('value') value: string): Promise<Role> {
    return this.rolesService.getRoleByValue(value);
  }
}
