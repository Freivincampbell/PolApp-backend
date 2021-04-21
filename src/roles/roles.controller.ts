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
import { Role } from '../schemas/role.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
	constructor(private readonly rolesService: RolesService) {}

	@Post()
	@RolesDecorator([ROLE.SUPERADMIN])
	async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
		return await this.rolesService.create(createRoleDto);
	}

	@Get()
	@RolesDecorator([ROLE.SUPERADMIN, ROLE.CLIENT])
	async findAll(): Promise<Role[]> {
		return await this.rolesService.findAll();
	}

	@Get(':id')
	@RolesDecorator([ROLE.SUPERADMIN, ROLE.CLIENT])
	async findOne(@Param('id') id: string): Promise<Role> {
		return await this.rolesService.findOne(id);
	}

	@Patch(':id')
	@RolesDecorator([ROLE.SUPERADMIN])
	async update(
		@Param('id') id: string,
		@Body() updateRoleDto: UpdateRoleDto,
	): Promise<Role> {
		return await this.rolesService.update(id, updateRoleDto);
	}

	@Delete(':id')
	@RolesDecorator([ROLE.SUPERADMIN])
	async remove(@Param('id') id: string): Promise<Role> {
		return await this.rolesService.remove(id);
	}
}
