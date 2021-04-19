import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Status, StatusDocument } from '../schemas/status.schema';

import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { IStatus } from '../interfaces/status.interface';

@Injectable()
export class StatusesService {
	constructor(
		@InjectModel(Status.name) private statusModel: Model<StatusDocument>,
	) {}

	async create(createStatusDto: CreateStatusDto): Promise<IStatus> {
		const createdStatus = new this.statusModel(createStatusDto);

		return await createdStatus.save().catch((errors) => {
			return errors;
		});
	}

	async findAll(): Promise<IStatus[]> {
		return await this.statusModel
			.find()
			.exec()
			.catch((errors) => {
				return errors;
			});
	}

	async findOne(id: string): Promise<IStatus> {
		return await this.statusModel
			.findById(id)
			.exec()
			.catch((errors) => {
				return errors;
			});
	}

	async update(id: string, updateStatusDto: UpdateStatusDto): Promise<IStatus> {
		return await this.statusModel
			.findByIdAndUpdate(id, updateStatusDto)
			.exec()
			.catch((errors) => {
				return errors;
			});
	}

	async remove(id: string): Promise<IStatus> {
		return await this.statusModel
			.findByIdAndDelete(id)
			.exec()
			.catch((errors) => {
				return errors;
			});
	}
}
