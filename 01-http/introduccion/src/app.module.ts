import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {CalculadoraModule} from "./calculadora/calculadora.module";

@Module({
  imports: [
      HttpJuegoModule,
      UsuarioModule,
      CalculadoraModule
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
