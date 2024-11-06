import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ClientedetailsComponent } from '../clientedetails/clientedetails.component';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ClienteService } from '../../../services/cliente.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-clientelist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, ClientedetailsComponent],
  templateUrl: './clientelist.component.html',
  styleUrls: ['./clientelist.component.scss']
})
export class ClientelistComponent {
  data1 = new Date('2021-04-23T10:00:00.000Z');
  lista: Cliente[] = [];
  clienteEdit: Cliente = new Cliente(0, "", "", "", this.data1, "", "", "", 0, "");

  @Input("esconderBotoes") esconderBotoes: boolean = false;
  @Output("retorno") retorno = new EventEmitter<any>();

  // ELEMENTOS DA MODAL
  modalService = inject(MdbModalService); // para conseguir abrir a modal
  @ViewChild("modalClienteDetalhe") modalClienteDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  clienteService = inject(ClienteService);

  constructor() {
    this.findAll();

    let clienteNovo = history.state.clienteNovo;
    let clienteEditado = history.state.clienteEditado;

    if (clienteNovo != null) {
      clienteNovo.id = 555;
      this.lista.push(clienteNovo);
    }

    if (clienteEditado != null) {
      let indice = this.lista.findIndex((x) => {
        return x.id == clienteEditado.id;
      });
      this.lista[indice] = clienteEditado;
    }
  }

  findAll() {
    this.clienteService.findAll().subscribe({
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

  deleteById(cliente: Cliente) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe({
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
    this.clienteEdit = new Cliente(0, "", "", "", this.data1, "", "", "", 0, "");
    this.modalRef = this.modalService.open(this.modalClienteDetalhe);
  }

  edit(cliente: Cliente) {
    this.clienteEdit = Object.assign({}, cliente); // clonando para evitar referência de objeto
    this.modalRef = this.modalService.open(this.modalClienteDetalhe);
  }

  retornoDetalhe(cliente: Cliente) {
    this.findAll();
    this.modalRef.close();
  }

  select(cliente: Cliente){
    this.retorno.emit(cliente);
  }
}
