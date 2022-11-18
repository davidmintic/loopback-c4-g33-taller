import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Usuario,
  Sede,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioSedeController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/sede', {
    responses: {
      '200': {
        description: 'Sede belonging to Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sede)},
          },
        },
      },
    },
  })
  async getSede(
    @param.path.string('id') id: typeof Usuario.prototype.idUsuario,
  ): Promise<Sede> {
    return this.usuarioRepository.sede(id);
  }
}
