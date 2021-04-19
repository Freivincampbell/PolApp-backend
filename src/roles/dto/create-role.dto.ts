import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
	@IsNotEmpty({ message: 'Description must not be empty' })
	@IsString({ message: 'Description must be a string' })
	readonly description: string;
}
