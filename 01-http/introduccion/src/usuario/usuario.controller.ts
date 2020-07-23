import {Body, Controller, Get, Param, Post} from "@nestjs/common";

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

    @Get()
    mostrarTodos(){
        return this.arregloUsuarios
    }

    @Post()
    crearUno(
        @Body() parametrosCuerpo
    ){
        const nuevoUsuario = {
            id: this.idActual +1,
            nombre: parametrosCuerpo.nombre
        };

            this.arregloUsuarios.push(nuevoUsuario);
            this.idActual = this.idActual +1;
            return nuevoUsuario;
    }
    @Get('id')
    verUno(
        @Param() parametrosRuta
    ){
        const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number(parametrosRuta.id)
        )
        return this.arregloUsuarios[indice];

    }

}