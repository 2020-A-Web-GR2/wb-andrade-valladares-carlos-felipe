import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";

@Controller('usuario')
export class UsuarioController {
    public arregloUsuarios = [
        {
            id:1,
            nombre: 'Felipe'
        },
        {
            id:2,
            nombre: 'Carlos'
        },
        {
            id:3,
            nombre: 'Sofi'
        }
    ]
    public idActual = 3;

    constructor(
        private readonly _usuarioService: UsuarioService
    ){

    }

    @Get()
    async mostrarTodos(){
        try {
            const respuesta = await this._usuarioService.buscarTodos();
            return respuesta;
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor',
            })

        }


        //return this.arregloUsuarios
    }

    @Post()
    async crearUno(
        @Body() parametrosCuerpo
    ){

        try {
            const repuesta = await this._usuarioService.crearUno(parametrosCuerpo);
            return repuesta;
        } catch (e) {
            console.error(e);
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            });

        }
        // const nuevoUsuario = {
        //     id: this.idActual +1,
        //     nombre: parametrosCuerpo.nombre
        // };
        //
        //     this.arregloUsuarios.push(nuevoUsuario);
        //     this.idActual = this.idActual +1;
        //     return nuevoUsuario;
    }
    @Get(':id')
    async verUno(
        @Param() parametrosRuta
    ){

        let respuesta;
        try {
            respuesta = await this._usuarioService
                .buscarUno(Number(parametrosRuta.id));
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor',
            })
        }

        if (respuesta){
            return respuesta
        }else {
            throw new NotFoundException({
                mensaje: 'No existen registros',
            })
        }
        // const indice = this.arregloUsuarios.findIndex(
        //     (usuario) => usuario.id === Number(parametrosRuta.id)
        // )
        // return this.arregloUsuarios[indice];

    }

    @Put(':id')
    async editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ){
        const id = Number(parametrosRuta.id);
        const usuarioEditado = parametrosCuerpo;
        usuarioEditado.id= id;

        try {
            console.log('usuarioEditado', usuarioEditado)
            const repuesta = await this._usuarioService.editarUno(usuarioEditado);
            return repuesta;
        } catch (e) {
            console.error(e);
            throw new BadRequestException({
                mensaje: 'Error del servidor'
            });

        }



        // const indice = this.arregloUsuarios.findIndex(
        //     (usuario) => usuario.id === Number(parametrosRuta.id)
        // )
        // this.arregloUsuarios[indice].nombre = parametrosCuerpo.nombre;
        // return this.arregloUsuarios[indice];

    }

    @Delete(':id')
    async eliminarUno(
        @Param() parametrosRuta
    ){

        const id = Number(parametrosRuta.id);
        try {
            const repuesta = await this._usuarioService.eliminarUno(id);
            return {mensaje: 'Registro con id: '+ id + 'eliminado'};
        } catch (e) {
            console.error(e);
            throw new BadRequestException({
                mensaje: 'Error del servidor'
            });

        // const indice = this.arregloUsuarios.findIndex(
        //     (usuario) => usuario.id === Number(parametrosRuta.id)
        // )
        // this.arregloUsuarios.splice(indice, 1)
        // return this.arregloUsuarios[indice];

    }

}
}