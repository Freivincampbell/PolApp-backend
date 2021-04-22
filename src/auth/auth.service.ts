import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ICurrentUser } from '../interfaces/current-user.interface';
import { User } from '../schemas/user.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(username: string, password: string): Promise<User> {
		const user: User = await this.usersService.findOneByUsername(username);

		if (user?.comparePassword(password)) return user;

		return null;
	}

	async login(user: ICurrentUser): Promise<any> {
		const payload: ICurrentUser = {
			id: user.id,
			username: user.username,
			role: user.role,
			user: user?.user || user.id,
		};

		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
