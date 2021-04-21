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
import { RolesDecorator } from '../lib/decorators/roles.decorator';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@RolesDecorator([ROLE.SUPERADMIN, ROLE.CLIENT])
	async create(@Body() createUserDto: CreateUserDto): Promise<User> {
		return await this.usersService.create(createUserDto);
	}

	@Get()
	@RolesDecorator([ROLE.SUPERADMIN, ROLE.CLIENT, ROLE.AGENT])
	async findAll(): Promise<User[]> {
		return await this.usersService.findAll();
	}

	@Get(':id')
	@RolesDecorator([ROLE.SUPERADMIN, ROLE.CLIENT, ROLE.AGENT])
	async findOne(@Param('id') id: string): Promise<User> {
		return await this.usersService.findOne(id);
	}

	@Patch(':id')
	@RolesDecorator([ROLE.SUPERADMIN, ROLE.CLIENT])
	async update(
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserDto,
	): Promise<User> {
		return await this.usersService.update(id, updateUserDto);
	}

	@Delete(':id')
	@RolesDecorator([ROLE.SUPERADMIN, ROLE.CLIENT])
	async remove(@Param('id') id: string): Promise<User> {
		return await this.usersService.remove(id);
	}
}
