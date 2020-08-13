import {Module} from "@nestjs/common";
import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";



@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                UsuarioEntity
            ],
            'default' //nombre de la cadena de conexion
        )

    ],
    controllers: [

        UsuarioController

    ],
    providers: [

        UsuarioService
    ],
})


export class UsuarioModule {

}