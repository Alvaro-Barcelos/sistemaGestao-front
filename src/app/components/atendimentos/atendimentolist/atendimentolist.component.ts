import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Atendimento } from '../../../models/atendimento';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AtendimentoService } from '../../../services/atendimento.service';
import Swal from 'sweetalert2';
import { Cliente } from '../../../models/cliente';
import { Funcionario } from '../../../models/funcionario';
import { TipoAtendimento } from '../../../models/tipo-atendimento';
import { AtendimentodetailsComponent } from '../atendimentodetails/atendimentodetails.component';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-atendimentolist',
  standalone: true,
  imports: [FormsModule, AtendimentodetailsComponent, NgIf, NgFor],
  templateUrl: './atendimentolist.component.html',
  styleUrls: ['./atendimentolist.component.scss']
})
export class AtendimentolistComponent {
  // Variável para armazenar o mês e ano selecionado
  mesAno: string = new Date().toISOString().slice(0, 7); // Padrão para o mês atual

  lista: Atendimento[] = [];
  AtendimentoEdit!: Atendimento;

  modalService = inject(MdbModalService);
  @ViewChild("modalAtendimentoDetalhe") modalAtendimentoDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  AtendimentoService = inject(AtendimentoService);

  constructor() {
    this.findAll(); // Chama o método para carregar os atendimentos ao iniciar
    this.carregarNomes(); // Carregar os nomes ao inicializar
  }
  tipo: string = 'funcionario'; // Tipo selecionado (funcionário ou cliente)
  listaNomes: { id: number; nome: string }[] = []; // Lista de entidades (funcionários ou clientes)
  entidadeSelecionadaId!: number; // ID da entidade selecionada
  totalAtendimentos: number | null = null; // Resultado da busca
  listaAtendimentos: any[] = []; // Lista de atendimentos
  

  // Carrega os nomes de funcionários ou clientes sem ordenação
  carregarNomes() {
    if (this.tipo === 'funcionario') {
      this.AtendimentoService.getFuncionarios().subscribe({
        next: (funcionarios: Funcionario[]) => {
          this.listaNomes = funcionarios.map((f) => ({ id: f.id, nome: f.nome }));
        },
        error: () => {
          Swal.fire({
            title: 'Erro',
            text: 'Não foi possível carregar os funcionários.',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    } else {
      this.AtendimentoService.getClientes().subscribe({
        next: (clientes: Cliente[]) => {
          this.listaNomes = clientes.map((c) => ({ id: c.id, nome: c.nome }));
        },
        error: () => {
          Swal.fire({
            title: 'Erro',
            text: 'Não foi possível carregar os clientes.',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    }
  }

  // Método para buscar atendimentos por entidade
  buscarAtendimentosPorEntidade() {
    if (!this.entidadeSelecionadaId) {
      Swal.fire({
        title: 'Erro',
        text: 'Por favor, selecione uma entidade para buscar os atendimentos.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }

    const [ano, mes] = this.mesAno.split('-');  // Usa o mês e ano selecionado

    this.AtendimentoService.countByEntityAndMonth(this.tipo, this.entidadeSelecionadaId, Number(ano), Number(mes)).subscribe({
      next: (total) => {
        this.totalAtendimentos = total;
        this.buscarListaAtendimentos();
      },
      error: () => {
        Swal.fire({
          title: 'Erro',
          text: 'Não foi possível buscar a quantidade de atendimentos.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }

  buscarListaAtendimentos() {
    const [ano, mes] = this.mesAno.split('-');

    this.AtendimentoService.findByEntityAndMonth(this.tipo, this.entidadeSelecionadaId, Number(ano), Number(mes)).subscribe({
        next: (atendimentos) => {
            console.log('Atendimentos recebidos:', atendimentos);
            this.listaAtendimentos = atendimentos;
        },
        error: (err) => {
            console.error('Erro ao buscar atendimentos:', err);
            Swal.fire({
                title: 'Erro',
                text: 'Não foi possível buscar os atendimentos.',
                icon: 'error',
                confirmButtonText: 'Ok',
            });
        },
    });
}



  // Método para carregar atendimentos com base no mês e ano
  findAll() {
    const [ano, mes] = this.mesAno.split('-'); // Extrai ano e mês da string no formato YYYY-MM
    const dataAtual = new Date().toISOString().slice(0, 10); // Data atual no formato YYYY-MM-DD

    this.AtendimentoService.findByMonthAndYear(Number(ano), Number(mes)).subscribe({
        next: lista => {
            // Filtrar a partir da data atual
            this.lista = lista.filter(atendimento => atendimento.data_atendimento >= dataAtual);

            // Ordenar por data e hora
            this.lista.sort((a, b) => {
                const dataHoraA = new Date(`${a.data_atendimento}T${a.hora_atendimento}`);
                const dataHoraB = new Date(`${b.data_atendimento}T${b.hora_atendimento}`);
                return dataHoraA.getTime() - dataHoraB.getTime();
            });
        },
        error: erro => {
            Swal.fire({
                title: 'Ocorreu um erro',
                icon: 'error',
                confirmButtonText: 'Ok',
            });
        }
    });
}

formatarData(data: string | Date): string {
  if (!data) return '';
  
  // Se for um objeto Date, converte para string no formato YYYY-MM-DD
  if (data instanceof Date) {
    data = data.toISOString().split('T')[0];
  }

  const [ano, mes, dia] = data.split('-'); // Divide a data no formato YYYY-MM-DD
  return `${dia}/${mes}/${ano}`; // Reorganiza para DD/MM/YYYY
}


  onMonthChange() {
    const [ano, mes] = this.mesAno.split('-');  // Extrai ano e mês da string no formato YYYY-MM

    // Envia o ano e mês para o serviço
    this.AtendimentoService.findByMonthAndYear(Number(ano), Number(mes)).subscribe({
      next: lista => {
        this.lista = lista;  // Atribui a lista de atendimentos
      },
      error: erro => {
        Swal.fire({
          title: 'Ocorreu um erro',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    });
}

  deleteById(atendimento: Atendimento) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.AtendimentoService.delete(atendimento.id).subscribe({
          next: mensagem => {
            Swal.fire({
              title: mensagem,
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.findAll(); // Recarrega os atendimentos após excluir
          },
          error: erro => {
            Swal.fire({
              title: 'Ocorreu um erro',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        });
      }
    });
  }

  // Métodos para editar e criar atendimentos
  new() {
    this.AtendimentoEdit = new Atendimento(0, new Funcionario(0, "", "", "", "", new Date(), "", "", "", 0, ""),
      new Cliente(0, "", "", "", new Date(), "", "", "", 0, ""), new TipoAtendimento(0, "", 0),
      new Date(), new Date(), "");
    this.modalRef = this.modalService.open(this.modalAtendimentoDetalhe);
  }

  edit(atendimento: Atendimento) {
    this.AtendimentoEdit = Object.assign({}, atendimento);
    this.modalRef = this.modalService.open(this.modalAtendimentoDetalhe);
  }

  retornoDetalhe(atendimento: Atendimento) {
    this.findAll();
    this.modalRef.close();
  }
}
