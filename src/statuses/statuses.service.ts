import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Status, StatusDocument } from '../schemas/status.schema';

import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class StatusesService {
	constructor(
		@InjectModel(Status.name) private statusModel: Model<StatusDocument>,
	) {}

	async create(createStatusDto: CreateStatusDto): Promise<Status> {
		const createdStatus = new this.statusModel(createStatusDto);

		return await createdStatus.save().catch((errors) => {
			return errors;
		});
	}

	async findAll(): Promise<Status[]> {
		return await this.statusModel
			.find()
			.exec()
			.catch((errors) => {
				return errors;
			});
	}

	async findOne(id: string): Promise<Status> {
		return await this.statusModel
			.findById(id)
			.exec()
			.catch((errors) => {
				return errors;
			});
	}

	async update(id: string, updateStatusDto: UpdateStatusDto): Promise<Status> {
		return await this.statusModel
			.findByIdAndUpdate(id, updateStatusDto)
			.exec()
			.catch((errors) => {
				return errors;
			});
	}

	async remove(id: string): Promise<Status> {
		return await this.statusModel
			.findByIdAndDelete(id)
			.exec()
			.catch((errors) => {
				return errors;
			});
	}
}
