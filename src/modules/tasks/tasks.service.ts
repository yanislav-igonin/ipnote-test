import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async getAll(search: string): Promise<Task[]> {
    return this.taskModel
      .find({
        text: { $regex: search, $options: 'i' },
      })
      .exec();
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async removeById(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id);
  }

  async toggleIsDone(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id)

    if (task === null) {
      return null;
    }

    return this.taskModel.findByIdAndUpdate(id, { isDone: !task.isDone })
  }
}
