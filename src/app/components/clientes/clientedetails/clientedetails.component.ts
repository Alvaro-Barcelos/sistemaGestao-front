import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Cliente } from '../../../models/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ClienteService } from '../../../services/cliente.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-clientedetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './clientedetails.component.html',
  styleUrls: ['./clientedetails.component.scss']
})
export class ClientedetailsComponent {
  data1 = new Date('2021-04-23T10:00:00.000Z');
  @Input("cliente") cliente: Cliente = new Cliente(0, "", "", "", this.data1, "", "", "", 0, "");
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  
  clienteService = inject(ClienteService);

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    } else {
      if (this.cliente.id > 0) this.findById(id);
    }
  }

  findById(id: number) {
    this.clienteService.findById(id).subscribe({
      next: retorno => {
        this.cliente = retorno;
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
    if (this.cliente.id > 0) {
      this.clienteService.update(this.cliente, this.cliente.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['clientes'], { state: { clienteEditado: this.cliente } });
          this.retorno.emit(this.cliente);
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
      this.clienteService.save(this.cliente).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['clientes'], { state: { clienteNovo: this.cliente } });
          this.retorno.emit(this.cliente);
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
