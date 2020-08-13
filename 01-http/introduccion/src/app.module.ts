import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {CalculadoraModule} from "./calculadora/calculadora.module";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
      HttpJuegoModule,
      UsuarioModule,
      TypeOrmModule.forRoot({
          name: 'deafult', // nombre de la conexion
          type: 'mysql', // ,ysql postgres
          host: 'localhost', //ip
          port: 3306, //puerto
          username: 'Root', //usuario
          password: 'root', //password
          database: 'test', //base de datos
          entities: [ // TODAS LAS ENTIDADES

          ],
          synchronize: true, //ACTUALIZA EL ESQUEMA DE LA BASE DE DATOS.
          dropSchema: false, //ELIMINA DATOS Y EL ESQUEMA DE BASE DE DATOS
      }),
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
