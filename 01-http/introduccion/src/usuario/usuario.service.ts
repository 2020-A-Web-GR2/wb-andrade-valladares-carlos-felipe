import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UsuarioService{
    constructor(  //inyecccion de dependenciaas
        @InjectRepository(UsuarioEntity)
        private repositorio: Repository<UsuarioEntity>

    ){

    }

    crearUno( nuevoUsuario: UsuarioEntity){
        return this.repositorio.save(nuevoUsuario)
    }

}