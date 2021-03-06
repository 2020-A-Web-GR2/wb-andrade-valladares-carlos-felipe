import {
    Controller,
    Get,
    Post,
    Delete,
    HttpCode,
    Header,
    BadRequestException,
    Param,
    Query,
    Body,
    Res, Req,
    Headers
} from '@nestjs/common';
import {MascotaCreateDto} from "./dto/mascota.create-dto";
import {validate, ValidationError} from "class-validator";


// /juegos-http
@Controller('juegos-http')
export class HttpJuegoController{

    @Get('hola')
    @HttpCode(201)
    holaGet(){
        //throw new BadRequestException('no envia nada')

        return 'Hola Mundo :3';
    }

    @Post('hola')
    @HttpCode(202)
    holaPost(){
        return 'hola Post :3';
    }

    @Delete('hola')
    @HttpCode(204)
    @Header('Cache-control', 'none')
    @Header('EPN', 'probando las cosas')
    holaDelete(){
        return 'hola Delete :3';
    }

    @Get('/parametros-ruta/:edad/gestion/:altura')
    parametrosRutaEjemplo(

        @Param() parametrosRuta

    ){
        console.log('Parametros', parametrosRuta);
        //validar si es un numero.
        isNaN(parametrosRuta.edad)
        isNaN(parametrosRuta.altura)
        // throw new BadRequestException ('no son numeros')
        const edad = Number(parametrosRuta.edad);
        const altura = Number(parametrosRuta.altura);
        return edad + altura;
    }

    @Get('parametros-consulta')
    parametrosConsulta(
        @Query() parametrosDeConsulta
    ){
        const nombreyapellido = parametrosDeConsulta.nombre && parametrosDeConsulta.apellido;
        console.log('parametrosDeConsulta', parametrosDeConsulta);
        if(nombreyapellido) {
            return parametrosDeConsulta.nombre + '' + parametrosDeConsulta.apellido;
        }else{
            return ':3';
        }
        return parametrosDeConsulta
    }

    @Post('parametros-cuerpo')
    @HttpCode(200)
    async parametrosCuerpo(
        @Body() parametrosCuerpo
    ){
        //Promesas
        const mascotaValida = new MascotaCreateDto();
        mascotaValida.casada = parametrosCuerpo.casada;
        mascotaValida.edad = parametrosCuerpo.edad;
        mascotaValida.ligada = parametrosCuerpo.ligada;
        mascotaValida.nombre = parametrosCuerpo.nombre;
        mascotaValida.peso = parametrosCuerpo.peso;

        try {
            const errores: ValidationError[]  = await validate(mascotaValida);
            if (errores.length > 0){
                console.error('Error', errores);
                throw new BadRequestException('Error Validando')
            } else{
                const mensajeCorrecto = {
                    mensaje: 'Se creo correctamente'
                }
                return mensajeCorrecto;
            }

        }catch (e) {
            console.error('Error', e )
            throw new BadRequestException('error validando');

        }


    }

    @Get('guardarCookieInsegura')
    guardarCookieInsegura(
        @Query()  parametosConsulta,
        @Req() req,
        @Res() res
    ){
        res.cookie(
            'galletaInsegura',
            'Tengo hambre',
        );
        const  mensaje ={
            mensaje:'ok'
        };
        res.send(mensaje);

    }

    @Get('guardarCookieSegura')
    guardarCookieSegura(
        @Query()  parametosConsulta,
        @Req() req,
        @Res() res
    ){
        res.cookie(
            'galletaSegura',
            'Web :3',
            {
                secure:true
            }
        );
        const  mensaje ={
            mensaje:'ok'
        };
        res.send(mensaje);

    }

    @Get('mostrarCookies')
    mostrarCookies(
        @Req() req
    ){
        const mensaje = {
            sinfirmar: req.cookies,
            firmadas: req.signedCookies
        };
        return mensaje;
    }

    @Get('guardarCookieFirmada')
    public guardarcookieFirmada(
        @Res() res,
        @Headers() headers // peticion - request
    ){
        console.log('Headers', headers);
        res.header('Cabecera', 'Dinamica');  //respuesta- response

        res.cookie('Firmada', 'Poliburger',{signed: true});
        const mensaje = {
            mensaje: 'ok'
        };
        res.send(mensaje);
    }

}
