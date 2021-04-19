import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role, RoleSchema } from '../schemas/role.schema';
import * as uniqueValidator from 'mongoose-unique-validator';

@Module({
	imports: [
		MongooseModule.forFeatureAsync([
			{
				name: Role.name,
				useFactory: () => {
					RoleSchema.plugin(uniqueValidator, {
						message: '{PATH} already exists',
					});

					return RoleSchema;
				},
			},
		]),
	],
	controllers: [RolesController],
	providers: [RolesService],
})
export class RolesModule {}
