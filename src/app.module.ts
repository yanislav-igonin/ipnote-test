import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './modules/tasks/tasks.module';
import { config } from './config';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoUrl),
    TasksModule, 
  ],
})
export class AppModule {}
