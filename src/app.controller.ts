import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { ICurrentUser } from './interfaces/current-user.interface';
import { Public } from './lib/decorators/public.decorator';
import { CurrentUser } from './lib/decorators/user.decorator';

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly authService: AuthService,
	) {}

	@Public()
	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@Public()
	@UseGuards(LocalAuthGuard)
	@Post('auth/login')
	async login(@Request() req): Promise<any> {
		return this.authService.login(req.user);
	}

	@Get('profile')
	getProfile(@CurrentUser() user: ICurrentUser): ICurrentUser {
		return user;
	}
}
