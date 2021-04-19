import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStatusDto {
	@IsNotEmpty({ message: 'Description must not be empty' })
	@IsString({ message: 'Description must be a string' })
	readonly description: string;
}
