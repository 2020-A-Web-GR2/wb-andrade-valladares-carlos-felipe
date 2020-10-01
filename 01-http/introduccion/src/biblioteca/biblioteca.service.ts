import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Like, Repository} from "typeorm";
import {BibliotecaEntity} from "./biblioteca.entity";

@Injectable()
export class BibliotecaService{

    constructor(  //inyecccion de dependenciaas
        @InjectRepository(BibliotecaEntity)
        private repositorio: Repository<BibliotecaEntity>

    ){

    }

    crearUno( nuevaBiblioteca: BibliotecaEntity){
        return this.repositorio.save(nuevaBiblioteca)
    }

    buscarTodos(textoDeConsulta?: string) {

        const consulta: FindManyOptions<BibliotecaEntity> = {
            where: [
                {
                    nombre: Like(`%${textoDeConsulta}%`)
                },

                {
                    estado: Like(`%${textoDeConsulta}%`)
                },

            ]
        }

        return this.repositorio.find(consulta) // promesa
    }

    buscarUno( id: number){
        return this.repositorio.findOne(id)
    }

    editarUno( bibliotecaEditado: BibliotecaEntity){
        return this.repositorio.save(bibliotecaEditado);
    }

    eliminarUno( id: number){
        return this.repositorio.delete(id);
    }

}