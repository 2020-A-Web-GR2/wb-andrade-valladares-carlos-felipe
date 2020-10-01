import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BibliotecaEntity} from "./biblioteca.entity";
import {BibliotecaController} from "./biblioteca.controller";
import {BibliotecaService} from "./biblioteca.service";


@Module({
    imports: [

        TypeOrmModule.forFeature(
            [
                BibliotecaEntity
            ],
            'default' //nombre de la cadena de conexion
        )

    ],
    controllers: [

        BibliotecaController

    ],
    providers: [

        BibliotecaService
    ],
})

export class BibliotecaModule {

}