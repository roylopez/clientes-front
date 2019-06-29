import { Consumo } from './consumos/consumo';

/**Clase que representa el objeto Tarjeta*/
export class Tarjeta {
  id: number;
  numero: string;
  ccv: number;
  tipo: string;
  clienteId: number;
  consumos: Consumo[];
}
