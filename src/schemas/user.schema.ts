import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Document, Types } from 'mongoose';
import { Role } from './role.schema';
import { Status } from './status.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
	@Prop({
		required: [true, 'Name must not be empty'],
		minlength: 4,
		maxlength: 16,
	})
	name: string;

	@Prop({
		required: [true, 'Last Name must not be empty'],
		minlength: 4,
		maxlength: 16,
	})
	lastName: string;

	@Prop({
		required: [true, 'Email must not be empty'],
		unique: true,
		index: true,
		lowercase: true,
	})
	email: string;

	@Prop({
		required: [true, 'Username must not be empty'],
		unique: true,
		index: true,
		minlength: 4,
		maxlength: 32,
	})
	username: string;

	@Prop({
		required: [true, 'Phone must not be empty'],
		unique: true,
	})
	phone: string;

	@Prop({
		required: [true, 'Password must not be empty'],
		select: false,
	})
	password: string;

	@Prop({
		required: [true, 'Identification must not be empty'],
		unique: true,
		index: true,
	})
	identification: string;

	@Prop({
		required: [true, 'Status must not be empty'],
		type: Types.ObjectId,
		ref: Status.name,
	})
	status: Status;

	@Prop({
		required: [true, 'Role must not be empty'],
		type: Types.ObjectId,
		ref: Role.name,
	})
	role: Role;

	@Prop({
		type: Types.ObjectId,
		ref: User.name,
	})
	user: User;

	comparePassword(password: string): boolean {
		return bcrypt.compareSync(password, this.password);
	}

	hashPassword(password: string, HASH_SALT: number): string {
		return bcrypt.hashSync(password, HASH_SALT);
	}
}

export const UserSchema = SchemaFactory.createForClass(User);

// This part here (see https://mongoosejs.com/docs/guide.html#es6-classes)
UserSchema.loadClass(User);
