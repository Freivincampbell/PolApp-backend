import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { ROLE } from '../constants';
import { ICurrentUser } from '../interfaces/current-user.interface';
import { RolesDecorator } from '../lib/decorators/roles.decorator';
import { CurrentUser } from '../lib/decorators/user.decorator';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@RolesDecorator([ROLE.SUPERADMIN, ROLE.CLIENT, ROLE.AGENT])
	async create(
		@CurrentUser() user: ICurrentUser,
		@Body() createUserDto: CreateUserDto,
	): Promise<User> {
		return await this.usersService.create(createUserDto, user);
	}

	@Get()
	@RolesDecorator([ROLE.SUPERADMIN, ROLE.CLIENT, ROLE.AGENT])
	async findAll(@CurrentUser() currentUser: ICurrentUser): Promise<User[]> {
		return await this.usersService.findAll(currentUser);
	}

	@Get(':id')
	@RolesDecorator([ROLE.SUPERADMIN, ROLE.CLIENT, ROLE.AGENT])
	async findOne(
		@CurrentUser() currentUser: ICurrentUser,
		@Param('id') id: string,
	): Promise<User> {
		return await this.usersService.findOne(id, currentUser);
	}

	@Patch(':id')
	@RolesDecorator([ROLE.SUPERADMIN, ROLE.CLIENT, ROLE.AGENT])
	async update(
		@CurrentUser() currentUser: ICurrentUser,
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserDto,
	): Promise<User> {
		return await this.usersService.update(id, updateUserDto, currentUser);
	}

	@Delete(':id')
	@RolesDecorator([ROLE.SUPERADMIN])
	async remove(@Param('id') id: string): Promise<User> {
		return await this.usersService.remove(id);
	}
}
