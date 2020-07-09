import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*
  * aqui configuracion.
  * antes del app.listen()
  * 
  * */
  //await app.listen(3000);
  await app.listen(3001);
}
bootstrap();
