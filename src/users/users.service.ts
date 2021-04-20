import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../schemas/role.schema';
import { Status } from '../schemas/status.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
		private readonly configService: ConfigService,
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const createdUser = new this.userModel(createUserDto);

		createdUser.password = this.hashPassword(createdUser.password);

		const result = await createdUser.save().catch((errors) => {
			return errors;
		});

		if (result.id) return await this.findOne(result.id);

		return result;
	}

	async findAll(): Promise<User[]> {
		return await this.userModel
			.find()
			.populate({
				path: 'user',
				model: User.name,
				populate: {
					path: 'role',
					model: Role.name,
				},
			})
			.populate({
				path: 'user',
				model: User.name,
				populate: {
					path: 'status',
					model: Status.name,
				},
			})
			.exec()
			.catch((errors) => {
				return errors;
			});
	}

	async findOne(id: string): Promise<User> {
		return await this.userModel
			.findById(id)
			.populate({
				path: 'user',
				model: User.name,
				populate: {
					path: 'role',
					model: Role.name,
				},
			})
			.populate({
				path: 'user',
				model: User.name,
				populate: {
					path: 'status',
					model: Status.name,
				},
			})
			.exec()
			.catch((errors) => {
				return errors;
			});
	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
		if (updateUserDto.password) {
			updateUserDto.password = this.hashPassword(updateUserDto.password);
		}

		return await this.userModel
			.findByIdAndUpdate(id, updateUserDto, { new: true })
			.exec()
			.catch((errors) => {
				return errors;
			});
	}

	async remove(id: string): Promise<User> {
		return await this.userModel
			.findByIdAndDelete(id)
			.exec()
			.catch((errors) => {
				return errors;
			});
	}

	async findOneByUsername(username: string): Promise<User> {
		return await this.userModel
			.findOne({ username })
			.select('+password')
			.populate({
				path: 'role',
				model: Role.name,
			})
			.exec()
			.catch((error) => {
				return error;
			});
	}

	private readonly hashPassword = (password: string): string => {
		return new this.userModel().hashPassword(
			password,
			parseInt(this.configService.get('HASH_SALT')),
		);
	};
}

// const user = await this.userModel.findById(id).select('+password').exec();
// const same = user.comparePassword('12345');
