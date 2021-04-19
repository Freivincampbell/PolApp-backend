import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envConfiguration } from './lib/config/envConfiguration';
import { RolesModule } from './roles/roles.module';
import { StatusesModule } from './statuses/statuses.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [envConfiguration],
		}),
		MongooseModule.forRoot(process.env.DB_URL, {
			useFindAndModify: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		}),
		RolesModule,
		StatusesModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
