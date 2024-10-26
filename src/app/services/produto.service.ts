import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  http = inject(HttpClient);

  API = "http://localhost:8080/produto"

  constructor() { }

  findAll(): Observable<Produto[]>{
    return this.http.get<Produto[]>(this.API+"/findAll");
  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
  }

  save(produto: Produto): Observable<string>{
    return this.http.post<string>(this.API+"/save", produto, {responseType: 'text' as 'json'});
  }

  update(produto: Produto, id: number): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+id, produto, {responseType: 'text' as 'json'});
  }

  findById(id: number): Observable<Produto>{
    return this.http.get<Produto>(this.API+"/findById/"+id);
  }
}
