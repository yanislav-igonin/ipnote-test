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
  Put,
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
  async create(@Body() createTaskDto: CreateTaskDto): Promise<{ task: Task }> {
    const createdTask = await this.tasksService.create(createTaskDto);
    return { task: createdTask };
  }

  @Delete(':taskId')
  async removeById(
    @Param('taskId') taskId: string,
  ): Promise<{ deleted: true }> {
    const result = await this.tasksService.removeById(taskId);

    if (result === null) {
      throw new NotFoundException();
    }

    return { deleted: true };
  }

  @Put(':taskId/done')
  async toggleIsDone(@Param('taskId') taskId: string): Promise<{ task: Task }> {
    const result = await this.tasksService.toggleIsDone(taskId);

    if (result === null) {
      throw new NotFoundException();
    }

    return { task: result };
  }
}
