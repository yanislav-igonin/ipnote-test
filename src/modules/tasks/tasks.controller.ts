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
  @ApiQuery({ name: 'search',  })
  @ApiOkResponse({ type: CreateTaskDto, isArray: true })
  async getAll(
    @Query('search', new DefaultValuePipe('')) search: string,
  ): Promise<Task[]> {
    const tasks = await this.tasksService.getAll(search);
    return tasks;
  }

  @Post()
  @ApiCreatedResponse({ type: CreateTaskDto })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = await this.tasksService.create(createTaskDto);
    return createdTask;
  }

  @Delete(':taskId')
  @ApiOkResponse({ type: CreateTaskDto })
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
  @ApiOkResponse({ type: CreateTaskDto })
  @ApiNotFoundResponse({ description: 'Task not found.' })
  async toggleIsDone(@Param('taskId') taskId: string): Promise<{ task: Task }> {
    const result = await this.tasksService.toggleIsDone(taskId);

    if (result === null) {
      throw new NotFoundException();
    }

    return { task: result };
  }
}
