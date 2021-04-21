import { PartialType } from '@nestjs/mapped-types';
import {
	IsMongoId,
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@IsMongoId({ message: 'Invalid ObjectId' })
	@IsNotEmpty({ message: 'Id must be an ObjectId' })
	readonly id: string;

	@IsNotEmpty({ message: 'Password must not be empty' })
	@IsString({ message: 'Password must be a string' })
	@MinLength(5, { message: 'Password must not be less than 5 charters' })
	@MaxLength(32, {
		message: 'Password is longer than the maximum allowed length (32)',
	})
	password?: string;
}
