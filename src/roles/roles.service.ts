import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from '../schemas/role.schema';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { IRole } from '../interfaces/role.interface';

@Injectable()
export class RolesService {
	constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

	async create(createRoleDto: CreateRoleDto): Promise<IRole> {
		const createdRole = new this.roleModel(createRoleDto);

		return await createdRole.save().catch((errors) => {
			return errors;
		});
	}

	async findAll(): Promise<IRole[]> {
		return await this.roleModel
			.find()
			.exec()
			.catch((errors) => {
				return errors;
			});
	}

	async findOne(id: string): Promise<IRole> {
		return await this.roleModel
			.findById(id)
			.exec()
			.catch((errors) => {
				return errors;
			});
	}

	async update(id: string, updateRoleDto: UpdateRoleDto): Promise<IRole> {
		return await this.roleModel
			.findByIdAndUpdate(id, updateRoleDto)
			.exec()
			.catch((errors) => {
				return errors;
			});
	}

	async remove(id: string): Promise<IRole> {
		return await this.roleModel
			.findByIdAndDelete(id)
			.exec()
			.catch((errors) => {
				return errors;
			});
	}
}
