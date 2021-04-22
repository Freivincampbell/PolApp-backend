import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { ROLE, STATUS } from '../constants';
import { ICurrentUser } from '../interfaces/current-user.interface';
import { RolesDecorator } from '../lib/decorators/roles.decorator';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { findAllQuery, findOneQuery } from './queries/users.query';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
		private readonly configService: ConfigService,
	) {}

	async create(
		createUserDto: CreateUserDto,
		currentUser: ICurrentUser,
	): Promise<User> {
		const createdUser = new this.userModel(createUserDto);

		createdUser.password = await this.hashPassword(createdUser.password);
		createdUser.user = this.assignUser(currentUser);

		const result = await createdUser.save().catch((errors) => {
			return errors;
		});

		if (result.id) return await this.findOne(result.id);

		return result;
	}

	async findAll(currentUser: ICurrentUser): Promise<User[]> {
		return await this.userModel
			.find(findAllQuery(currentUser))
			.populate({
				path: 'user',
				model: User.name,
			})
			.exec()
			.catch((errors) => {
				return errors;
			});
	}

	async findOne({ id, currentUser }): Promise<User> {
		return await this.userModel
			.findOne(findOneQuery(id, currentUser))
			.populate({
				path: 'user',
				model: User.name,
			})
			.exec()
			.catch((errors) => {
				return errors;
			});
	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
		if (updateUserDto.password) {
			updateUserDto.password = await this.hashPassword(updateUserDto.password);
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
			.findOne({ username, status: STATUS.ACTIVE })
			.select('+password')
			.exec()
			.catch((error) => {
				return error;
			});
	}

	private readonly hashPassword = async (password: string): Promise<string> => {
		return await new this.userModel().hashPassword(
			password,
			parseInt(this.configService.get('HASH_SALT')),
		);
	};

	private readonly assignUser = ({
		id,
		role,
		user,
	}: ICurrentUser): ObjectId => {
		switch (role) {
			case ROLE.CLIENT:
				return id;
			case ROLE.AGENT:
				return user;
			case ROLE.SUPERADMIN:
				return id;
		}
	};
}
