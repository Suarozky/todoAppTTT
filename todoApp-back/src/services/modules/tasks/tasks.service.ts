import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Task from '../../../databases/rds/entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async findByUserId(userId: string): Promise<Task[]> {
    const tasks = await this.taskRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    if (tasks.length === 0) {
      throw new NotFoundException(`No tasks found for user with ID ${userId}`);
    }
    return tasks;
  }

  async create(task: Partial<Task>): Promise<Task> {
    const newTask = this.taskRepository.create(task);
    return this.taskRepository.save(newTask);
  }

  async update(id: string, task: Partial<Task>): Promise<Task> {
    const existingTask = await this.findOne(id);
    if (!existingTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    await this.taskRepository.update(id, task);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
