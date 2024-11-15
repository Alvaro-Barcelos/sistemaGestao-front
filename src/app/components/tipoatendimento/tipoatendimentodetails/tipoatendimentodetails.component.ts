import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { TipoAtendimento } from '../../../models/tipo-atendimento';
import { TipoAtendimentoService } from '../../../services/tipo-atendimento.service';

@Component({
  selector: 'app-tipoatendimentodetails',  // Alteração: Nome do componente
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './tipoatendimentodetails.component.html', // Alteração: Template de TipoAtendimento
  styleUrl: './tipoatendimentodetails.component.scss'  // Alteração: Estilos de TipoAtendimento
})
export class TipoatendimentodetailsComponent {  // Alteração: Nome da classe
  @Input("tipoatendimento") tipoatendimento: TipoAtendimento = new TipoAtendimento(0, "", 0); // Alteração: Usando TipoAtendimento
  @Output("retorno") retorno = new EventEmitter<any>();
  
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  tipoAtendimentoService = inject(TipoAtendimentoService);  // Alteração: Usar TipoAtendimentoService

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    } else {
      if (this.tipoatendimento.id > 0) this.findById(id);
    }
  }

  findById(id: number) {
    this.tipoAtendimentoService.findById(id).subscribe({
      next: retorno => {
        this.tipoatendimento = retorno;
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

  save() {
    if (this.tipoatendimento.id > 0) {
      this.tipoAtendimentoService.update(this.tipoatendimento, this.tipoatendimento.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['tipoatendimentos'], { state: { tipoatendimentoEditado: this.tipoatendimento } });
          this.retorno.emit(this.tipoatendimento);
        },
        error: erro => {
          Swal.fire({
            title: 'Ocorreu um erro',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      });
    } else {
      this.tipoAtendimentoService.save(this.tipoatendimento).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['tipoatendimentos'], { state: { tipoatendimentoNovo: this.tipoatendimento } });
          this.retorno.emit(this.tipoatendimento);
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
  }
}
