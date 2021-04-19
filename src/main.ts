import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

const bootstrap = async () => {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	const config = app.get(ConfigService);
	const port = config.get('PORT');

	app.enableCors();

	await app.listen(port, () => {
		console.log(`App running on port: ${port} 🚀`);
	});
};

bootstrap().catch();
