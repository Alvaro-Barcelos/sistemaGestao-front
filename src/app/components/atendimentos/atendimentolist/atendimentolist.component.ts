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

@Component({
  selector: 'app-atendimentolist',
  standalone: true,
  imports: [FormsModule, AtendimentodetailsComponent],
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
  }

  // Método para carregar atendimentos com base no mês e ano
  findAll() {
    const [ano, mes] = this.mesAno.split('-');  // Extrai ano e mês da string no formato YYYY-MM
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
