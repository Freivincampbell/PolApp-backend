import { IsMongoId, IsNotEmpty } from 'class-validator';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends CreateRoleDto {
	@IsMongoId({ message: 'Invalid ObjectId' })
	@IsNotEmpty({ message: 'Id must be an ObjectId' })
	readonly id: string;
}
