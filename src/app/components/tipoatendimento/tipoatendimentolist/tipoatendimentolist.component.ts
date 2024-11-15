import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';

import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { TipoatendimentodetailsComponent} from '../tipoatendimentodetails/tipoatendimentodetails.component'; // Alterado: Componente de detalhes de TipoAtendimento
import { TipoAtendimento } from '../../../models/tipo-atendimento';
import { TipoAtendimentoService } from '../../../services/tipo-atendimento.service';

@Component({
  selector: 'app-tipoatendimentolist', // Alterado: Nome do componente
  standalone: true,
  imports: [RouterLink, MdbModalModule, TipoatendimentodetailsComponent], // Alterado: Usando TipoAtendimentodetailsComponent
  templateUrl: './tipoatendimentolist.component.html', // Alterado: Nome do template
  styleUrls: ['./tipoatendimentolist.component.scss'] // Alterado: Nome do arquivo de estilo
})
export class TipoatendimentolistComponent { // Alterado: Nome da classe
  lista: TipoAtendimento[] = [];
  tipoAtendimentoEdit: TipoAtendimento = new TipoAtendimento(0, "", 0);

  @Input("esconderBotoes") esconderBotoes: boolean = false;
  @Output("retorno") retorno = new EventEmitter<any>();

  // ELEMENTOS DA MODAL
  modalService = inject(MdbModalService); // Para abrir a modal
  @ViewChild("modalTipoAtendimentoDetalhe") modalTipoAtendimentoDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  tipoAtendimentoService = inject(TipoAtendimentoService); // Alterado: Usando TipoAtendimentoService

  constructor() {
    this.findAll();

    let tipoAtendimentoNovo = history.state.tipoAtendimentoNovo;
    let tipoAtendimentoEditado = history.state.tipoAtendimentoEditado;

    if (tipoAtendimentoNovo != null) {
      tipoAtendimentoNovo.id = 555;
      this.lista.push(tipoAtendimentoNovo);
    }

    if (tipoAtendimentoEditado != null) {
      let indice = this.lista.findIndex((x) => {
        return x.id == tipoAtendimentoEditado.id;
      });
      this.lista[indice] = tipoAtendimentoEditado;
    }
  }

  findAll() {
    this.tipoAtendimentoService.findAll().subscribe({
      next: lista => {
        console.log(lista);
        this.lista = lista;
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

  deleteById(tipoAtendimento: TipoAtendimento) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este tipo de atendimento?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipoAtendimentoService.delete(tipoAtendimento.id).subscribe({
          next: mensagem => {
            Swal.fire({
              title: mensagem,
              icon: 'success',
              confirmButtonText: 'Ok',
            });

            this.findAll();
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

  new() {
    this.tipoAtendimentoEdit = new TipoAtendimento(0, "", 0);
    this.modalRef = this.modalService.open(this.modalTipoAtendimentoDetalhe);
  }

  edit(tipoAtendimento: TipoAtendimento) {
    this.tipoAtendimentoEdit = Object.assign({}, tipoAtendimento); // Clonando para evitar referência de objeto
    this.modalRef = this.modalService.open(this.modalTipoAtendimentoDetalhe);
  }

  retornoDetalhe(tipoAtendimento: TipoAtendimento) {
    this.findAll();
    this.modalRef.close();
  }

  select(tipoAtendimento: TipoAtendimento) {
    this.retorno.emit(tipoAtendimento);
  }
}
