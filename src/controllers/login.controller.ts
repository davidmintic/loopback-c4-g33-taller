// Uncomment these imports to begin using these cool features!

import {service} from '@loopback/core';
import {
  getModelSchemaRef,
  HttpErrors,
  post,
  requestBody,
  response,
} from '@loopback/rest';

// import {inject} from '@loopback/core';
import {Credenciales} from '../models/credenciales.model';
import {AutenticacionService} from '../services';

export class LoginController {
  constructor(
    @service(AutenticacionService)
    private autenticacionService: AutenticacionService,
  ) {}

  @post('/login')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Credenciales)}},
  })
  async login(@requestBody() credenciales: Credenciales) {
    let usuario = await this.autenticacionService.autenticar(credenciales);

    if (usuario) {
      let token = await this.autenticacionService.generarToken(usuario);
      return {
        data: usuario,
        token,
      };
    } else {
      throw new HttpErrors[401]('Datos incorrectos');
    }
  }
}
