import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // aqui van otros modulos importados.
  ],
  controllers: [
    // Controladores del APP module
    AppController
  ],
  providers: [
    // servicios del APP module.
    AppService
  ],
})
export class AppModule {}
