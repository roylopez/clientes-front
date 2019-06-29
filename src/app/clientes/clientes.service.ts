import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Cliente } from './cliente';

/**Servicio utilizado para las operaciones CRUD de los clientes*/
@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private clientesEndPoint: string = 'http://localhost:9090/api/clientes';

  constructor(private httpClient: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.clientesEndPoint);
  }

  getCliente(id: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${this.clientesEndPoint}/${id}`);
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.post(this.clientesEndPoint, cliente).pipe(
      map((response: any) => response.cliente as Cliente)
    );
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.put(`${this.clientesEndPoint}/${cliente.id}`, cliente).pipe(
      map((response: any) => response.cliente as Cliente)
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.httpClient.delete(`${this.clientesEndPoint}/${id}`).pipe(
      map((response: any) => response.cliente as Cliente)
    );
  }
}
