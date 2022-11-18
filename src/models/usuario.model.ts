import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Sede} from './sede.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: false,
  })
  idUsuario: string;

  @property({
    type: 'string',
    required: false,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
  })
  telefono?: string;

  @property({
    type: 'date',
  })
  fechaNacimiento?: string;

  @property({
    type: 'string',
    required: true,
  })
  contrasenia: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoUsuario: string;

  @belongsTo(() => Sede)
  sedeId: string;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
