import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post, Put, Query, Res
} from "@nestjs/common";

import {BibliotecaEntity} from "./biblioteca.entity";
import {validate, ValidationError} from "class-validator";
import {BibliotecaCreateDto} from "./dto/biblioteca.create-dto";
import {BibliotecaService} from "./biblioteca.service";


@Controller('biblioteca')
export class BibliotecaController {

    constructor(
        private readonly _bibliotecaService: BibliotecaService,
       ){

    }

    @Get()
    async mostrarTodos(){
        try {
            const respuesta = await this._bibliotecaService.buscarTodos();
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
            const repuesta = await this._bibliotecaService.crearUno(parametrosCuerpo);
            return repuesta;
        } catch (e) {
            console.error(e);
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            });

        }
    }

    @Get(':id')
    async verUno(
        @Param() parametrosRuta
    ){

        let respuesta;
        try {
            respuesta = await this._bibliotecaService
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
            const repuesta = await this._bibliotecaService.editarUno(usuarioEditado);
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
            const repuesta = await this._bibliotecaService.eliminarUno(id);
            return {mensaje: 'Registro con id: '+ id + 'eliminado'};
        } catch (e) {
            console.error(e);
            throw new BadRequestException({
                mensaje: 'Error del servidor'
            });

        }



    }





    @Get('vista/inicio')
    async inicio(
        @Res() res,
        @Query() parametrosConsulta
    ) {
        let resultadoEncontrado
        try {
            resultadoEncontrado = await this._bibliotecaService.buscarTodos(parametrosConsulta.busqueda);
        } catch (error) {
            throw new InternalServerErrorException('Error encontrando bibliotecas')
        }
        if (resultadoEncontrado) {
            res.render(
                'biblioteca/inicio.biblioteca.ejs',
                {
                    arregloBibliotecas: resultadoEncontrado,
                    parametrosConsulta: parametrosConsulta
                });
        } else {
            throw new NotFoundException('No se encontraron bibliotecas')
        }
    }


    @Get('vista/crear')
    crearBibliotecaVista(
        @Query() parametrosConsulta,
        @Res() res
    ) {

        return res.render('biblioteca/crear.biblioteca.ejs', {
            error: parametrosConsulta.error,
            nombre: parametrosConsulta.nombre,
            direccion: parametrosConsulta.direccion,
            categoria_libros: parametrosConsulta.categoria_libros,
            numero_clientes: parametrosConsulta.numero_clientes,
            estado: parametrosConsulta.estado
        })

    }

    @Get('vista/editar/:id') // Controlador
    async editarBibliotecaVista(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res
    ) {
        const id = Number(parametrosRuta.id)
        let bibliotecaEncontrada;
        try {
            bibliotecaEncontrada = await this._bibliotecaService.buscarUno(id);
        } catch (error) {
            console.error('Error del servidor');
            return res.redirect('/biblioteca/vista/inicio?mensaje=Error buscando biblioteca');
        }
        if (bibliotecaEncontrada) {
            return res.render(
                'biblioteca/crear.biblioteca.ejs',
                {
                    error: parametrosConsulta.error,
                    biblioteca: bibliotecaEncontrada
                }
            )
        } else {
            return res.redirect('/biblioteca/vista/inicio?mensaje= Biblioteca no encontrada');
        }

    }

    @Post('crearDesdeVista')
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res( ) res,
    ) {
        //validar con un rico dto
        const bibliotecaValida = new BibliotecaCreateDto();
        bibliotecaValida.nombre = parametrosCuerpo.nombre;
        bibliotecaValida.direccion = parametrosCuerpo.direccion;
        bibliotecaValida.categoria_libros = parametrosCuerpo.categoria_libros;
        bibliotecaValida.numero_clientes = Number(parametrosCuerpo.numero_clientes);
        bibliotecaValida.estado = parametrosCuerpo.estado;

        let respuestaCreacionUsuario;


        try {
            const errores: ValidationError[] = await validate( bibliotecaValida );
            if (errores.length > 0) {
                console.error( 'Error', errores );
                throw new BadRequestException( 'Error Validando Datos' )
            } else {
                //lo qu pasa cuando valida los datos

                respuestaCreacionUsuario = await this._bibliotecaService.crearUno( parametrosCuerpo )

            }

        } catch (error) {
            console.error( error );
            const mensajeError = 'Error creando biblioteca'
            return res.redirect( '/biblioteca/vista/crear?error=' + mensajeError )
        }
        if (respuestaCreacionUsuario) {
            return res.redirect( '/biblioteca/vista/inicio' );
        } else {
            const mensajeError = 'Error creando biblioteca'
            return res.redirect( '/biblioteca/vista/crear?error=' + mensajeError )
        }
    }


    @Post('editarDesdeVista/:id')
    async editarDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        const bibliotecaEditada = {
            id: Number(parametrosRuta.id),
            nombre: parametrosCuerpo.nombre,
            direccion: parametrosCuerpo.direccion,
            categoria_libros: parametrosCuerpo.categoria_libros,
            numero_clientes: parametrosCuerpo.numero_clientes,
            estado: parametrosCuerpo.estado,

        } as BibliotecaEntity;
        try {
            await this._bibliotecaService.editarUno(bibliotecaEditada);
            return res.redirect('/biblioteca/vista/inicio?mensaje= Biblioteca editada');
        }catch (error) {
            console.error(error);
            return res.redirect('/biblioteca/vista/inicio?mensaje=Error editando biblioteca');
        }

    }

    @Post('eliminarDesdeVista/:id')
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res
    ){
        try {
            const id = Number(parametrosRuta.id);
            await this._bibliotecaService.eliminarUno(id)
            return res.redirect('/biblioteca/vista/inicio?mensaje= Biblioteca Eliminada')
        } catch (error) {
            console.log(error);
            return res.redirect('/biblioteca/vista/inicio?mensaje= Error eliminando Biblioteca')

        }


    }

}