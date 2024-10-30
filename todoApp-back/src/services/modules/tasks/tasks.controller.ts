// task.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import Task from '../../../databases/rds/entities/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User as UserDecorator } from '../../../auth/user.decorator';
import User from '../../../databases/rds/entities/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task | null> {
    return this.taskService.findOne(id);
  }

  @Get('user')
  async findByAuthenticatedUser(@UserDecorator() user: User): Promise<Task[]> {
    return this.taskService.findByUserId(user.id);
  }

  @Get('task/:userId')
  async findByUserId(@Param('userId') userId: string): Promise<Task[]> {
    return this.taskService.findByUserId(userId);
  }

  @Post()
  async create(@Body() task: Partial<Task>): Promise<Task> {
    return this.taskService.create(task);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() task: Partial<Task>,
  ): Promise<Task> {
    return this.taskService.update(id, task);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.taskService.delete(id);
  }
}
