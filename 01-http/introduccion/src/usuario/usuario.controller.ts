import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put, Res
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {MascotaService} from "../mascota/mascota.service";

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
        private readonly _usuarioService: UsuarioService,
        private readonly _mascotaService: MascotaService,
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

    @Post('crearUsuarioYCrearMascota')
    async crearUsuarioYCrearMascota(
        @Body() parametrosCuerpo
    ){
        const usuario = parametrosCuerpo.usuario;
        const mascota = parametrosCuerpo.mascota;
        // validar usuario
        // validar mascota
        // creamos los dos

        let usuarioCreado;
        try {
            usuarioCreado = await this._usuarioService.crearUno(usuario);
        } catch (e) {
            console.error(e);
            throw new InternalServerErrorException({
                mensaje:'Error creando usuario',
            })

        }
        if (usuarioCreado){
            mascota.usuario = usuarioCreado.id;
            let mascotaCreada;
            try {
                mascotaCreada = await this._mascotaService.crearNuevaMascota(mascota);

            }catch (e) {
                console.error(e);
                throw new InternalServerErrorException({
                    mensaje: 'Error creando mascota',
                })

            }
            if (mascotaCreada){
                return {
                    mascota: mascotaCreada,
                    usuario: usuarioCreado
                }
            }else {
                throw new InternalServerErrorException({
                    mensje: 'Error creando mascota',
                })
            }
        }else {
            throw new InternalServerErrorException({
                mensaje: 'Error creando mascota'
            })
        }


    }

    @Get('vista/usuario')
    vistaUsuario(
        @Res() res
    ){
        const nombreControlador = 'Felipe';
        res.render(
            'usuario/ejemplo', //nombre de la vista(archivo)
            {   //parametros de la vista
                nombre: nombreControlador,
            }
        )

    }


    @Get('vista/faq')
    faq(
        @Res() res
    ){

        res.render('usuario/faq')

    }


    @Get('vista/inicio')
    inicio(
        @Res() res
    ){

        res.render('usuario/inicio')

    }

    @Get('vista/login')
    login(
        @Res() res
    ){

        res.render('usuario/login')

    }
}