import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from '../schemas/user.schema';
import * as uniqueValidatorOnCreate from 'mongoose-unique-validator';
import * as uniqueValidatorOnUpdate from 'mongoose-beautiful-unique-validation';

@Module({
	imports: [
		MongooseModule.forFeatureAsync([
			{
				name: User.name,
				useFactory: () => {
					UserSchema.plugin(uniqueValidatorOnCreate, {
						message: '{PATH} already exists',
					});
					UserSchema.plugin(uniqueValidatorOnUpdate, {
						message: '{PATH} already exists',
					});

					return UserSchema;
				},
			},
		]),
	],
	controllers: [UsersController],
	providers: [UsersService],
})
export class UsersModule {}
