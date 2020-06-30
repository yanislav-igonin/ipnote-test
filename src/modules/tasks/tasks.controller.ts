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
import {
  ApiQuery,
  ApiTags,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @ApiQuery({ name: 'search', required: false })
  @ApiOkResponse({ type: Task, isArray: true })
  async getAll(
    @Query('search', new DefaultValuePipe('')) search: string,
  ): Promise<Task[]> {
    const tasks = await this.tasksService.getAll(search);
    return tasks;
  }

  @Post()
  @ApiCreatedResponse({ type: Task })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.tasksService.create(createTaskDto);
    return task;
  }

  @Delete(':taskId')
  @ApiOkResponse({ type: Task })
  @ApiNotFoundResponse({ description: 'Task not found.' })
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
  @ApiOkResponse({ type: Task })
  @ApiNotFoundResponse({ description: 'Task not found.' })
  async toggleIsDone(@Param('taskId') taskId: string): Promise<{ task: Task }> {
    const result = await this.tasksService.toggleIsDone(taskId);

    if (result === null) {
      throw new NotFoundException();
    }

    return { task: result };
  }
}
