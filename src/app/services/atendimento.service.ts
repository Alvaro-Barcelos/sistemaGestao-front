import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Atendimento } from '../models/atendimento';
import { Funcionario } from '../models/funcionario';
import { Cliente } from '../models/cliente';
@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {
  http = inject(HttpClient);
  API = "http://localhost:8080/atendimento";

  constructor() { }

    // Buscar horários disponíveis
    getHorariosDisponiveis(funcionarioId: number, data: string): Observable<string[]> {
      const params = new HttpParams().set('Id', funcionarioId).set('data_atendimento', data);
      return this.http.get<string[]>(`${this.API}/horarios-disponiveis`, { params });
    }

    // AtendimentoService

getHorariosIndisponiveis(funcionarioId: number, data: string): Observable<string[]> {
  const params = new HttpParams()
    .set('Id', funcionarioId.toString())
    .set('data_atendimento', data);
  return this.http.get<string[]>(`${this.API}/horarios-indisponiveis`, { params });
}

// Contar atendimentos por entidade e mês
countByEntityAndMonth(tipo: string, id: number, ano: number, mes: number): Observable<number> {
  const params = new HttpParams()
    .set('tipo', tipo)
    .set('id', id.toString())
    .set('ano', ano.toString())
    .set('mes', mes.toString());

  return this.http.get<number>(`${this.API}/countByEntityAndMonth`, { params });
}

// Buscar atendimentos por entidade e mês
findByEntityAndMonth(tipo: string, id: number, ano: number, mes: number): Observable<Atendimento[]> {
  const params = new HttpParams()
    .set('tipo', tipo)
    .set('id', id.toString())
    .set('ano', ano.toString())
    .set('mes', mes.toString());

  return this.http.get<Atendimento[]>(`${this.API}/findByEntityAndMonth`, { params });
}
// Buscar funcionários
getFuncionarios(): Observable<Funcionario[]> {
  return this.http.get<Funcionario[]>('http://localhost:8080/funcionario/findAll');
}

// Buscar clientes
getClientes(): Observable<Cliente[]> {
  return this.http.get<Cliente[]>('http://localhost:8080/cliente/findAll');
}

  
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
