import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AutenticacionService} from '../services/autenticacion.service';

export class EstrategiaAdmin implements AuthenticationStrategy {
  name: string = 'admin';

  constructor(
    @service(AutenticacionService)
    private autenticacionService: AutenticacionService,
  ) {}

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request);

    if (token) {
      const datos = this.autenticacionService.validarToken(token);

      if (datos) {
        let profile: UserProfile = Object.assign({
          correo: datos.data.correo,
        });

        return profile;
      } else {
        throw new HttpErrors[401]('Token inválido');
      }
    } else {
      throw new HttpErrors[401]('No hay token en la solicitud');
    }
  }
}
