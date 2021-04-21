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
import { Status } from '../schemas/status.schema';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { StatusesService } from './statuses.service';

@Controller('statuses')
export class StatusesController {
	constructor(private readonly statusesService: StatusesService) {}

	@Post()
	@RolesDecorator([ROLE.SUPERADMIN])
	async create(@Body() createStatusDto: CreateStatusDto): Promise<Status> {
		return await this.statusesService.create(createStatusDto);
	}

	@Get()
	@RolesDecorator([ROLE.SUPERADMIN, ROLE.CLIENT, ROLE.AGENT])
	async findAll(): Promise<Status[]> {
		return await this.statusesService.findAll();
	}

	@Get(':id')
	@RolesDecorator([ROLE.SUPERADMIN, ROLE.CLIENT, ROLE.AGENT])
	async findOne(@Param('id') id: string): Promise<Status> {
		return await this.statusesService.findOne(id);
	}

	@Patch(':id')
	@RolesDecorator([ROLE.SUPERADMIN])
	async update(
		@Param('id') id: string,
		@Body() updateStatusDto: UpdateStatusDto,
	): Promise<Status> {
		return await this.statusesService.update(id, updateStatusDto);
	}

	@Delete(':id')
	@RolesDecorator([ROLE.SUPERADMIN])
	async remove(@Param('id') id: string): Promise<Status> {
		return await this.statusesService.remove(id);
	}
}
