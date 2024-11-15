import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';

import { Funcionario } from '../../../models/funcionario';
import { Cliente } from '../../../models/cliente';
import { TipoAtendimento } from '../../../models/tipo-atendimento';
import { Atendimento } from '../../../models/atendimento';
import { ActivatedRoute, Router } from '@angular/router';
import { AtendimentoService } from '../../../services/atendimento.service';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { ProdutolistComponent } from '../../produtos/produtolist/produtolist.component';
import { ClientelistComponent } from '../../clientes/clientelist/clientelist.component';
import { FuncionariolistComponent } from '../../funcionarios/funcionariolist/funcionariolist.component';
import { TipoatendimentolistComponent } from '../../tipoatendimento/tipoatendimentolist/tipoatendimentolist.component';

@Component({
  selector: 'app-atendimentodetails',
  standalone: true,
  imports: [ MdbModalModule,FormsModule, MdbFormsModule, TipoatendimentolistComponent, ClientelistComponent, FuncionariolistComponent],
  templateUrl: './atendimentodetails.component.html',
  styleUrl: './atendimentodetails.component.scss'
})
export class AtendimentodetailsComponent {

  data1 = new Date('2021-04-23T10:00:00.000Z');
  @Input("atendimento") atendimento: Atendimento = new Atendimento(
    0,
    new Funcionario(0, "", "", "", "", new Date(), "", "", "", 0, ""), 
    new Cliente(0, "", "", "", new Date(), "", "", "", 0, ""),
    new TipoAtendimento(0,"",0), 
    new Date(),
    new Date(), 
    "");     

  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router2 = inject(Router);

  //Produto
  modalService = inject(MdbModalService);
  @ViewChild("modalTipoAtendimento") modalTipoAtendimento!: TemplateRef<any>; 
  modalRef!: MdbModalRef<any>;

  //Cliente
  modalService2 = inject(MdbModalService);
  @ViewChild("modalClientes") modalClientes!: TemplateRef<any>; 
  modalRef2!: MdbModalRef<any>;


  //Funcionario
  modalService3 = inject(MdbModalService);
  @ViewChild("modalFuncionarios") modalFuncionarios!: TemplateRef<any>; 
  modalRef3!: MdbModalRef<any>;


  atendimentoService = inject(AtendimentoService);

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    } else {
      if (this.atendimento.id > 0) this.findById(id);
    }
  }

  findById(id: number) {
    this.atendimentoService.findById(id).subscribe({
      next: retorno => {
        this.atendimento = retorno;
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
    
  
    if (this.atendimento.id > 0) {
      // Atualiza a venda existente
      this.atendimentoService.update(this.atendimento, this.atendimento.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['atendimentos'], { state: { atendimentoEditado: this.atendimento } });
          this.retorno.emit(this.atendimento);
          this.modalRef.close();
        },
        error: erro => {
          Swal.fire({
            title: 'Erro ao atualizar venda',
            text: erro.error.message || erro.message || 'Erro desconhecido',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
          this.modalRef.close();
        }
      });
    } else {
      // Para novas vendas
      this.atendimentoService.save(this.atendimento).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['atendimentos'], { state: { vendaProdutoNovo: this.atendimento } });
          this.retorno.emit(this.atendimento);
          this.modalRef.close();
        },
        error: erro => {
          Swal.fire({
            title: 'Erro ao cadastrar nova venda',
            text: erro.error.message || erro.message || 'Erro desconhecido',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
          this.modalRef.close();
        }
      });
    }
  }


  



buscartipo(){
  this.modalRef = this.modalService.open(this.modalTipoAtendimento, {modalClass: 'modal-xl'})
}

retornoTipoAtendimento(tipoAtendimento: TipoAtendimento){
  this.atendimento.tipo_atendimento = tipoAtendimento;
  this.modalRef.close();
}



  buscarCliente(){
    this.modalRef2 = this.modalService.open(this.modalClientes, {modalClass: 'modal-xl'})
  }
  retornoCliente(cliente: Cliente){
    this.atendimento.cliente = cliente;
    this.modalRef2.close();
  }


  buscarFuncionario() {
    this.modalRef3 = this.modalService.open(this.modalFuncionarios, { modalClass: 'modal-xl' });
  }
  retornoFuncionario(funcionario: Funcionario){
    this.atendimento.funcionario = funcionario;
    this.modalRef3.close();
  }



}
