import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger } from './services/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import dataSource from './databases/rds/dataSource';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  swagger(app);

  app.useGlobalPipes(new ValidationPipe());
  await dataSource
    .initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    });

  await app.listen(3000);

  Logger.log(`Server running on http://localhost:3001`, 'Main');
}
bootstrap();
