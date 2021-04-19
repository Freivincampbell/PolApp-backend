import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { IStatus } from '../interfaces/status.interface';

@Controller('statuses')
export class StatusesController {
	constructor(private readonly statusesService: StatusesService) {}

	@Post()
	async create(@Body() createStatusDto: CreateStatusDto): Promise<IStatus> {
		return await this.statusesService.create(createStatusDto);
	}

	@Get()
	async findAll(): Promise<IStatus[]> {
		return await this.statusesService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<IStatus> {
		return await this.statusesService.findOne(id);
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateStatusDto: UpdateStatusDto,
	): Promise<IStatus> {
		return await this.statusesService.update(id, updateStatusDto);
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<IStatus> {
		return await this.statusesService.remove(id);
	}
}
