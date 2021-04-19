import { CreateRoleDto } from './create-role.dto';
import { IsNotEmpty, IsMongoId } from 'class-validator';

export class UpdateRoleDto extends CreateRoleDto {
	@IsMongoId({ message: 'Invalid ObjectId' })
	@IsNotEmpty({ message: 'Id must be an ObjectId' })
	readonly id: string;
}
