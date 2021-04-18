import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

const bootstrap = async () => {
	const app = await NestFactory.create(AppModule);
	const config = app.get(ConfigService);
	const port = config.get('PORT');

	app.enableCors();

	await app.listen(port, () => {
		console.log(`App running on port: ${port} 🚀`);
	});
};

bootstrap().catch();
