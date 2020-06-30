import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Task extends Document {
  @Prop({ required: true })
  text: string;

  @Prop({ default: false })
  isDone: boolean;
}

const TaskSchema = SchemaFactory.createForClass(Task);
TaskSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

export { TaskSchema };
