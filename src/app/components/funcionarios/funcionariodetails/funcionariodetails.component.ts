import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Funcionario } from '../../../models/funcionario'; // Certifique-se de que o caminho do modelo esteja correto
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FuncionarioService } from '../../../services/funcionario.service'; // Certifique-se de que o caminho do serviço esteja correto
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-funcionariodetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './funcionariodetails.component.html',
  styleUrls: ['./funcionariodetails.component.scss']
})
export class FuncionariodetailsComponent {
  data1 = new Date('2021-04-23T10:00:00.000Z');
  @Input("funcionario") funcionario: Funcionario = new Funcionario(0, "", "", "", "", this.data1, "", "","", 0,"");
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  
  funcionarioService = inject(FuncionarioService);

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    } else {
      if (this.funcionario.id > 0) this.findById(id);
    }
  }

  findById(id: number) {
    this.funcionarioService.findById(id).subscribe({
      next: retorno => {
        this.funcionario = retorno;
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
    if (this.funcionario.id > 0) {
      this.funcionarioService.update(this.funcionario, this.funcionario.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['funcionarios'], { state: { funcionarioEditado: this.funcionario } });
          this.retorno.emit(this.funcionario);
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
      this.funcionarioService.save(this.funcionario).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['funcionarios'], { state: { funcionarioNovo: this.funcionario } });
          this.retorno.emit(this.funcionario);
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
