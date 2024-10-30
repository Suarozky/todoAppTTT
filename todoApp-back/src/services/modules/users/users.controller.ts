import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import User from '../../../databases/rds/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt')) // Protege esta ruta
  async findAll(): Promise<User[]> {
    // Devuelve todos los usuarios
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt')) // Protege esta ruta
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt')) // Protege esta ruta
  async update(
    @Param('id') id: string,
    @Body() user: Partial<User>,
  ): Promise<User> {
    const updatedUser = await this.userService.update(id, user);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt')) // Protege esta ruta
  getProtectedData() {
    return { message: 'This is protected data' };
  }
  @HttpCode(HttpStatus.NO_CONTENT) // Devuelve un 204 No Content
  async delete(@Param('id') id: string): Promise<void> {
    await this.userService.delete(id);
  }
}
