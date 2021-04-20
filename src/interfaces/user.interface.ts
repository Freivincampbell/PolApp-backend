import { Role } from '../schemas/role.schema';
import { Status } from '../schemas/status.schema';
import { User } from '../schemas/user.schema';

export interface IUser {
	readonly _id: string;
	readonly name: string;
	readonly lastName: string;
	readonly email: string;
	readonly username: string;
	readonly phone: string;
	readonly password: string;
	readonly identification: string;
	readonly role: Role;
	readonly status: Status;
	readonly user: User;
}
