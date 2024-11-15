import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoAtendimento } from '../models/tipo-atendimento';

@Injectable({
  providedIn: 'root'
})
export class TipoAtendimentoService {

  http = inject(HttpClient);

  API = "http://localhost:8080/tipoatendimento"

  constructor() { }

  findAll(): Observable<TipoAtendimento[]>{
    return this.http.get<TipoAtendimento[]>(this.API+"/findAll");
  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
  }

  save(tipoAtendimento: TipoAtendimento): Observable<string>{
    return this.http.post<string>(this.API+"/save", tipoAtendimento, {responseType: 'text' as 'json'});
  }

  update(tipoAtendimento: TipoAtendimento, id: number): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+id, tipoAtendimento, {responseType: 'text' as 'json'});
  }

  findById(id: number): Observable<TipoAtendimento>{
    return this.http.get<TipoAtendimento>(this.API+"/findById/"+id);
  }
}
