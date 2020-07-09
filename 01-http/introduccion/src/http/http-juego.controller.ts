import {Controller, Get, Post, Delete, HttpCode, Header, BadRequestException, Param, Query, Body} from '@nestjs/common';


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
    parametrosCuerpo(
        @Body() parametrosCuerpo
    ){
        console.log('Parametros de cuerpo', parametrosCuerpo);
        return 'registro creado';
    }


}
