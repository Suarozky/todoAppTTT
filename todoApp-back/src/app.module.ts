import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/config';
import { LoggingMiddleware } from 'src/middlewares/logging.middleware';
import { UserModule } from './services/modules/users/users.module';
import { TaskModule } from './services/modules/tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config.database),
    UserModule,
    TaskModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware) // Aplica el middleware de registro
      .forRoutes('*'); // Aplica a todas las rutas
  }
}
