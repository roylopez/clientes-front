import { Tarjeta } from '../tarjetas/tarjeta';

/**Clase que representa el objeto Cliente*/
export class Cliente {
  id: number;
  nombre: string;
  direccion: string;
  ciudad: string;
  telefono: number;
  tarjetas: Tarjeta[];
}
