import { Controller, Get, Post, Delete, Put, Param, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAll(@Param('search') search: string): Promise<{ tasks: Task[] }> {
    const tasks = await this.tasksService.getAll(search);
    return { tasks };
  }

  @Post()
  async create(@Body() task: Task): Promise<{ task: Task }> {
    const createdTask = await this.tasksService.create(task);
    return { task: createdTask };
  }
}
