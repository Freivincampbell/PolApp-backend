import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(username: string, password: string): Promise<any> {
		const user = await this.usersService.findOneByUsername(username);
		if (user.comparePassword(password)) {
			return user;
		}
		return null;
	}

	async login(user: any) {
		const payload = {
			id: user.id,
			username: user.username,
			role: user.role.description,
			userId: user?.user || user.id,
		};
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
