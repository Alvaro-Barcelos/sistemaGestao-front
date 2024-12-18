import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  http = inject(HttpClient);

  API = "http://localhost:8080/cliente";

  findAll(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.API+"/findAll")
  }
  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
  }

  save(cliente: Cliente): Observable<string>{
    return this.http.post<string>(this.API+"/save", cliente, {responseType: 'text' as 'json'});
  }

  update(cliente: Cliente, id: number): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+id, cliente, {responseType: 'text' as 'json'});
  }

  findById(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(this.API+"/findById/"+id);
  }
}
