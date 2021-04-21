import { IsMongoId, IsNotEmpty } from 'class-validator';
import { CreateStatusDto } from './create-status.dto';

export class UpdateStatusDto extends CreateStatusDto {
	@IsMongoId({ message: 'Invalid ObjectId' })
	@IsNotEmpty({ message: 'Id must be an ObjectId' })
	readonly id: string;
}
