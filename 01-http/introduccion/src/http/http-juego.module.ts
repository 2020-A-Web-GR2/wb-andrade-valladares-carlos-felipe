import { Module } from '@nestjs/common';
import { HttpJuegoController } from './http-juego.controller';

// @nombre() -> decorador
@Module({
    imports: [],
    controllers: [

        HttpJuegoController
        
    ],
    providers: [],
}) 
export class HttpJuegoModule{

}