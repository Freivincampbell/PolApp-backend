import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envConfiguration } from './lib/config/envConfiguration';
import { RolesModule } from './roles/roles.module';
import { StatusesModule } from './statuses/statuses.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [envConfiguration],
		}),
		MongooseModule.forRootAsync({
			useFactory: async (config: ConfigService) => ({
				uri: config.get('DB_URL'),
				useFindAndModify: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
			}),
			inject: [ConfigService],
		}),
		RolesModule,
		StatusesModule,
		UsersModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
