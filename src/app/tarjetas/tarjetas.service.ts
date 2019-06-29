import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Tarjeta } from './tarjeta';
import { Consumo } from './consumos/consumo';

/**Servicio utilizado para las operaciones CRUD de las tarjetas*/
@Injectable({
  providedIn: 'root'
})
export class TarjetasService {

  private tarjetasEndPoint: string = 'http://localhost:9090/api/tarjetas';

  constructor(private httpClient: HttpClient) { }

  getTarjetas(idCliente: number): Observable<Tarjeta[]> {
    return this.httpClient.get<Tarjeta[]>(`${this.tarjetasEndPoint}/cliente/${idCliente}`);
  }

  getTarjeta(id: number): Observable<Tarjeta> {
    return this.httpClient.get<Tarjeta>(`${this.tarjetasEndPoint}/${id}`);
  }

  create(tarjeta: Tarjeta): Observable<Tarjeta> {
    return this.httpClient.post(this.tarjetasEndPoint, tarjeta).pipe(
      map((response: any) => response.tarjeta as Tarjeta)
    );
  }

  update(tarjeta: Tarjeta): Observable<Tarjeta> {
    return this.httpClient.put(`${this.tarjetasEndPoint}/${tarjeta.id}`, tarjeta).pipe(
      map((response: any) => response.tarjeta as Tarjeta)
    );
  }

  delete(id: number): Observable<Tarjeta> {
    return this.httpClient.delete(`${this.tarjetasEndPoint}/${id}`).pipe(
      map((response: any) => response.tarjeta as Tarjeta)
    );
  }

  deleteConsumo(id: number): Observable<Consumo> {
    return this.httpClient.delete(`${this.tarjetasEndPoint}/consumos/${id}`).pipe(
      map((response: any) => response.consumo as Consumo)
    );
  }

  createConsumo(consumo: Consumo): Observable<Consumo> {
    return this.httpClient.post(`${this.tarjetasEndPoint}/consumos`, consumo).pipe(
      map((response: any) => response.consumo as Consumo)
    );
  }

  updateConsumo(consumo: Consumo): Observable<Consumo> {
    return this.httpClient.put(`${this.tarjetasEndPoint}/consumos/${consumo.id}`, consumo).pipe(
      map((response: any) => response.consumo as Consumo)
    );
  }

}
