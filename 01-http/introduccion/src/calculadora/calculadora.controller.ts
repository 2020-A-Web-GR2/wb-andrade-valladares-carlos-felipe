import {
    Controller,
    Get,
    HttpCode,
    Headers,
    Query,
    Put,
    Body,
    Delete,
    Post,
    Req,
    Res,
    BadRequestException
} from "@nestjs/common";
import {IsNumber, validate, ValidationError} from "class-validator";
import {CalculadoraCreateDto} from "./dto.calculadora/calculadora.create-dto";


let variable: number =100

@Controller('calculadora')
export class CalculadoraController {

    @Get('usuario')
    cookieUsuario(
        @Query()  parametrosDeConsulta,
        @Res() res,
        @Req() req
    ){
        res.cookie(
            'usuario ',
            parametrosDeConsulta.nombre
        );
        const  mensaje ={
            mensaje: parametrosDeConsulta.nombre + ' ahora puede usar la calcuadora'
        };
        res.send(mensaje);

    }

    @Get('usuario-puntaje')
    @HttpCode(200)
    usuarioPuntaje(
        @Query() parametrosDeConsulta,
        @Res() res,
        @Req() req
    ){
        res.cookie(
            'nombre',
            parametrosDeConsulta.nombre
        );
        res.cookie(
            'puntaje',
            variable,
            {
                signed: true
            }
        );
        res.send({
            mensaje: 'usuario: ' + parametrosDeConsulta.nombre + ', puntaje: ' + variable
        })

        const mensaje ={
            sinfirmar: req.cookies,
            firmadas: req.signedCookies
        }
        return mensaje;

    }

    @Get('sumar')
    @HttpCode(200)
    public sumar(
        @Query() parametrosDeConsulta,
        @Headers() Headers,


    ){
        const validacion = new CalculadoraCreateDto();
        validacion.n1 = parametrosDeConsulta.n1;
        validacion.n2 = Headers.n2;

        if(isNaN(parametrosDeConsulta.n1) && isNaN(Headers.n2)){
            throw new BadRequestException('Error, ingrese numeros');
        }else {
            const suma: number = parseInt(parametrosDeConsulta.n1) + parseInt(Headers.n2);
            variable = variable - suma;
            if (variable <= 0) {
                variable = 100
                return 'la respuesta es: '+ suma + ', Pero Se acabaron tus ' + variable + ' puntos, se te reestablecera de nuevo.';
            }else {
                return 'La suma de ' + parametrosDeConsulta.n1 + ' + ' + Headers.n2 + ' es ' + suma + ', sus puntos restantes son: ' + variable;
            }
        }

    }

    @Put('restar')
    @HttpCode(201)
    public restar(
        @Body() parametrosDeCuerpo,

    ){
        const validacion = new CalculadoraCreateDto();
        validacion.n1 = parametrosDeCuerpo.n1;
        validacion.n2 = parametrosDeCuerpo.n2;

        if(isNaN(parametrosDeCuerpo.n1) && isNaN(parametrosDeCuerpo.n2)){
            throw new BadRequestException('Error, ingrese numeros');
        }else {

            const resta: number = parametrosDeCuerpo.n1 - parametrosDeCuerpo.n2;
            variable = variable - resta
            if (variable <= 0) {
                variable = 100
                return 'la respuesta es: '+ resta + ', Pero Se acabaron tus ' + variable + ' puntos, se te reestablecera de nuevo.';
            } else {
                return 'La resta de ' + parametrosDeCuerpo.n1 + ' - ' + parametrosDeCuerpo.n2 + ' es ' + resta + ', sus puntos restantes son: ' + variable;
            }
        }

    }

    @Delete('multiplicar')
    @HttpCode(200)
    public multiplicar(
        @Headers() Headers

    ){
    const validacion = new CalculadoraCreateDto();
    validacion.n1 = Headers.n1;
    validacion.n2 = Headers.n2;

        if(isNaN(Headers.n1) && isNaN(Headers.n2)){
            throw new BadRequestException('Error, ingrese numeros');
        }else {

            const multiplicacion: number = Headers.n1 * Headers.n2;
            variable = variable - multiplicacion
            if (variable <= 0) {
                variable = 100
                return 'la respuesta es: '+ multiplicacion + ', Pero Se acabaron tus ' + variable + ' puntos, se te reestablecera de nuevo.';
            } else {
                return 'La multiplicacion de ' + Headers.n1 + ' * ' + Headers.n2 + ' es ' + multiplicacion + ', sus puntos restantes son: ' + variable;
            }
        }
    }

    @Post('dividir')
    @HttpCode(201)
    public division(
        @Query() parametrosDeConsulta){


    const validacion = new CalculadoraCreateDto();
    validacion.n1 = parametrosDeConsulta.n1;
    validacion.n2d = parametrosDeConsulta.n2d;

        if(isNaN(parametrosDeConsulta.n1) && isNaN(parametrosDeConsulta.n2)){
            throw new BadRequestException('Error, ingrese numeros');
        }else { if (parametrosDeConsulta.n2d ==0){
            throw new BadRequestException('Error, Ingrese divisor diferente de cero');
        }else {
            const division: number = parametrosDeConsulta.n1 / parametrosDeConsulta.n2d;
            variable = variable - division
            if (variable <= 0) {
                variable = 100
                return 'la respuesta es: '+ division + ', Pero Se acabaron tus ' + variable + ' puntos, se te reestablecera de nuevo.';
            } else {
                return 'La division de ' + parametrosDeConsulta.n1 + ' / ' + parametrosDeConsulta.n2d + ' es ' + division + ', sus puntos restantes son: ' + variable;
            }

        }
        }


    }


}