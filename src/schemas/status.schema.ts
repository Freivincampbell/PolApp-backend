import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StatusDocument = Status & Document;

enum Statuses {
	ACTIVE = 'ACTIVE',
	PENDING = 'PENDING',
	DELETED = 'DELETED',
	SUSPENDED = 'SUSPENDED',
}

@Schema()
export class Status {
	@Prop({
		required: [true, 'Description must not be empty'],
		uppercase: true,
		unique: true,
		index: true,
		enum: Statuses,
	})
	description: string;
}

export const StatusSchema = SchemaFactory.createForClass(Status);
