import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*
  * aqui configuracion.
  * antes del app.listen()
  * 
  * */
  //await app.listen(3000);
  app.use(cookieParser())
  await app.listen(3001);
}
bootstrap();
