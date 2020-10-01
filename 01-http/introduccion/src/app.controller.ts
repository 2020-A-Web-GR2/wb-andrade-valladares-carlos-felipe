import {Body, Controller, Get, Post, Req, Res, Session} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('login')
  login(
      @Res() response
  ){
    return response.render('login/login')
  }

  @Post('login')
  loginPost(
      @Body() parametrosConsulta,
      @Res() response,
      @Session() session
  ) {
    // validamos datos
    const usuario = parametrosConsulta.usuario;
    const password = parametrosConsulta.password;
    if (usuario == 'Adrian' && password == '1234') {
      session.usuario = usuario
      return response.redirect('/biblioteca/vista/inicio');
    } else {
        const mensajeError = 'Usuario Incorrecto'
        return response.redirect('/login?error=' + mensajeError )

    }
  }

  @Get('protegido')
  protegido(
      @Res() response,
      @Session() session,
  ) {
    const estaLogeado = session.usuario;
    if (estaLogeado) {
      return response.render(
          'login/protegido',
          {
            usuario: session.usuario,
            roles: session.roles
          }
      )
    } else {
      return response.redirect('/login')
    }
  }

  @Get('logout')
  logout(
      @Session() session,
      @Res() response,
      @Req() request

  ){
    session.username = undefined;
    session.username = undefined;
    request.session.destroy();
    return response.redirect('/login')
  }



}
