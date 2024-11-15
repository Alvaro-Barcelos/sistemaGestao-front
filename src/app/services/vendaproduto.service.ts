import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { VendaProduto } from '../models/VendaProduto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendaProdutoService {
  http = inject(HttpClient);

  API = "http://localhost:8080/venda"

  constructor() { }

  findAll(): Observable<VendaProduto[]>{
    return this.http.get<VendaProduto[]>(this.API+"/findAll");
  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
  }

  save(vendaProduto: VendaProduto): Observable<string>{
    return this.http.post<string>(this.API+"/save", vendaProduto, {responseType: 'text' as 'json'});
  }

  update(vendaProduto: VendaProduto, id: number): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+id, vendaProduto, {responseType: 'text' as 'json'});
  }

  findById(id: number): Observable<VendaProduto>{
    return this.http.get<VendaProduto>(this.API+"/findById/"+id);
  }

  getVendasByDate(year: number, month: number): Observable<VendaProduto[]> {
    return this.http.get<VendaProduto[]>(`${this.API}/findByDate/${year}/${month}`);
  }
}
