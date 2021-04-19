import { PartialType } from '@nestjs/mapped-types';
import { CreateStatusDto } from './create-status.dto';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdateStatusDto extends CreateStatusDto {
	@IsMongoId({ message: 'Invalid ObjectId' })
	@IsNotEmpty({ message: 'Id must be an ObjectId' })
	readonly id: string;
}
