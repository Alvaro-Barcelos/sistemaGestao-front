import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Atendimento } from '../models/atendimento';
@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {
  http = inject(HttpClient);
  API = "http://localhost:8080/atendimento";

  constructor() { }

  // Método para buscar atendimentos por mês e ano
  findByMonthAndYear(ano: number, mes: number): Observable<Atendimento[]> {
    return this.http.get<Atendimento[]>(`${this.API}/findByMonthAndYear?ano=${ano}&mes=${mes}`);
  }

  findAll(): Observable<Atendimento[]> {
    return this.http.get<Atendimento[]>(`${this.API}/findAll`);
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(`${this.API}/delete/${id}`, { responseType: 'text' as 'json' });
  }

  save(atendimento: Atendimento): Observable<string> {
    return this.http.post<string>(`${this.API}/save`, atendimento, { responseType: 'text' as 'json' });
  }

  update(atendimento: Atendimento, id: number): Observable<string> {
    return this.http.put<string>(`${this.API}/update/${id}`, atendimento, { responseType: 'text' as 'json' });
  }

  findById(id: number): Observable<Atendimento> {
    return this.http.get<Atendimento>(`${this.API}/findById/${id}`);
  }
}
