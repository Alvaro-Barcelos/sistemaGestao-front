import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Funcionario } from '../../../models/funcionario'; // Atualize para Funcionario
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { FuncionariodetailsComponent } from '../funcionariodetails/funcionariodetails.component'; // Atualize para FuncionariodetailsComponent
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { FuncionarioService } from '../../../services/funcionario.service'; // Atualize para FuncionarioService
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-funcionariolist', // Atualize o selector
  standalone: true,
  imports: [RouterLink, MdbModalModule, FuncionariodetailsComponent], // Atualize o componente
  templateUrl: './funcionariolist.component.html', // Atualize o template
  styleUrls: ['./funcionariolist.component.scss'] // Atualize o estilo
})
export class FuncionariolistComponent {
  data1 = new Date('2021-04-23T10:00:00.000Z');
  lista: Funcionario[] = []; // Atualize para Funcionario
  funcionarioEdit: Funcionario = new Funcionario(0, "", "", "", "", this.data1, "", "","", 0,""); // Atualize para Funcionario

  @Input("esconderBotoes") esconderBotoes: boolean = false;
  @Output("retorno") retorno = new EventEmitter<any>();

  // ELEMENTOS DA MODAL
  modalService = inject(MdbModalService);
  @ViewChild("modalFuncionarioDetalhe") modalFuncionarioDetalhe!: TemplateRef<any>; // Atualize o template
  modalRef!: MdbModalRef<any>;

  funcionarioService = inject(FuncionarioService); // Atualize para FuncionarioService

  constructor() {
    this.findAll();

    let funcionarioNovo = history.state.funcionarioNovo; // Atualize
    let funcionarioEditado = history.state.funcionarioEditado; // Atualize

    if (funcionarioNovo != null) {
      funcionarioNovo.id = 555;
      this.lista.push(funcionarioNovo);
    }

    if (funcionarioEditado != null) {
      let indice = this.lista.findIndex((x) => {
        return x.id == funcionarioEditado.id;
      });
      this.lista[indice] = funcionarioEditado;
    }
  }

  findAll() {
    this.funcionarioService.findAll().subscribe({
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

  deleteById(funcionario: Funcionario) { // Atualize para Funcionario
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.funcionarioService.delete(funcionario.id).subscribe({ // Atualize para FuncionarioService
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
    this.funcionarioEdit = new Funcionario(0, "", "", "", "", this.data1, "", "","", 0,""); // Atualize para Funcionario
    this.modalRef = this.modalService.open(this.modalFuncionarioDetalhe); // Atualize para Funcionario
  }

  edit(funcionario: Funcionario) { // Atualize para Funcionario
    this.funcionarioEdit = Object.assign({}, funcionario); // Atualize para Funcionario
    this.modalRef = this.modalService.open(this.modalFuncionarioDetalhe); // Atualize para Funcionario
  }

  retornoDetalhe(funcionario: Funcionario) { // Atualize para Funcionario
    this.findAll();
    this.modalRef.close();
  }
  select(funcionario : Funcionario){
    this.retorno.emit(funcionario);
  }
}
