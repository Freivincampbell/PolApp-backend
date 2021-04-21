import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import { Status, StatusSchema } from '../schemas/status.schema';
import { StatusesController } from './statuses.controller';
import { StatusesService } from './statuses.service';

@Module({
	imports: [
		MongooseModule.forFeatureAsync([
			{
				name: Status.name,
				useFactory: () => {
					StatusSchema.plugin(uniqueValidator, {
						message: '{PATH} already exists',
					});

					return StatusSchema;
				},
			},
		]),
	],
	controllers: [StatusesController],
	providers: [StatusesService],
})
export class StatusesModule {}
