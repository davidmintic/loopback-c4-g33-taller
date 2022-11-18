import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {UsuarioRepository} from '../repositories';
import {Credenciales} from '../models/credenciales.model';
import {Usuario} from '../models';
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(UsuarioRepository) private usuarioRepository: UsuarioRepository,
  ) {}

  /*
   * Add service methods here
   */

  async autenticar(credenciales: Credenciales): Promise<any> {
    try {
      let usuario = await this.usuarioRepository.findOne({
        where: {
          correo: credenciales.correo,
          contrasenia: credenciales.contrasenia,
        },
      });
      return usuario;
    } catch (error) {
      return null;
    }
  }

  async generarToken(usuario: Usuario): Promise<string> {
    let token = await jwt.sign(
      {
        data: {
          correo: usuario.correo,
          contrasenia: usuario.contrasenia,
        },
      },
      'keysecretxxx',
    );

    return token;
  }

  validarToken(token: string): any {
    try {
      let datos = jwt.verify(token, 'keysecretxxx');
      return datos;
    } catch (error) {
      return null;
    }
  }
}
