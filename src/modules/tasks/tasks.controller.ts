import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  DefaultValuePipe,
  Delete,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAll(
    @Query('search', new DefaultValuePipe('')) search: string,
  ): Promise<{ tasks: Task[] }> {
    const tasks = await this.tasksService.getAll(search);
    return { tasks };
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<{ task: any }> {
    const createdTask = await this.tasksService.create(createTaskDto);
    return { task: createdTask };
  }

  @Delete(':taskId')
  async removeById(@Param('taskId') taskId: string): Promise<any> {
    const result = await this.tasksService.removeById(taskId);
    
    if (result === null) {
      throw new NotFoundException();
    }

    return { deleted: true };
  }
}
