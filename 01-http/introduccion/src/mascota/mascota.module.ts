import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MascotaEntity} from "./mascota.entity";
import {MascotaService} from "./mascota.service";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                MascotaEntity


            ],
            'default' //nombre de la cadena de conexion
        )

    ],
    controllers: [],
    providers: [
        MascotaService
    ],
    exports: [
        MascotaService
    ]
})

export class MascotaModule {

}