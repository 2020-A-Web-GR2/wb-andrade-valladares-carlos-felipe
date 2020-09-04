import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser');
const express = require('express');

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;
  /*
  * aqui configuracion.
  * antes del app.listen()
  * 
  * */
  //await app.listen(3000);
  app.use(cookieParser('E agradan los poliperros'));
  app.set('view engine', 'ejs');
  app.use(express.static('publico'));

  await app.listen(3001);
}
bootstrap();
