import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ROLE } from '../constants';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
	@Prop({
		required: [true, 'Description must not be empty'],
		uppercase: true,
		unique: true,
		index: true,
		enum: [ROLE.SUPERADMIN, ROLE.CLIENT, ROLE.AGENT, ROLE.COSTUMER],
	})
	description: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
