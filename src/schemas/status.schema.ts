import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { STATUS } from '../constants';

export type StatusDocument = Status & Document;

@Schema()
export class Status {
	@Prop({
		required: [true, 'Description must not be empty'],
		uppercase: true,
		unique: true,
		index: true,
		enum: [STATUS.ACTIVE, STATUS.PENDING, STATUS.SUSPENDED, STATUS.SUSPENDED],
	})
	description: string;
}

export const StatusSchema = SchemaFactory.createForClass(Status);
