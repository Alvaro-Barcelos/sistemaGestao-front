import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Produto } from '../../../models/produto';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { VendaProduto } from '../../../models/VendaProduto';
import { VendaProdutoService } from '../../../services/vendaproduto.service';
import { Cliente } from '../../../models/cliente';
import { Funcionario } from '../../../models/funcionario';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { ProdutodetailsComponent } from '../../produtos/produtodetails/produtodetails.component';
import { ProdutolistComponent } from '../../produtos/produtolist/produtolist.component';
import { ClientelistComponent } from '../../clientes/clientelist/clientelist.component';
import { FuncionariolistComponent } from '../../funcionarios/funcionariolist/funcionariolist.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-vendadetails',
  standalone: true,
  imports: [MdbModalModule,FormsModule, MdbFormsModule, ProdutolistComponent, ClientelistComponent, FuncionariolistComponent],
  templateUrl: './vendadetails.component.html',
  styleUrl: './vendadetails.component.scss'
})
export class VendadetailsComponent {
  data1 = new Date('2021-04-23T10:00:00.000Z');
  @Input("vendaProduto") vendaProduto: VendaProduto = new VendaProduto(
    new Produto(0, "", "", 0, 0, 0, new Date()), 
    new Cliente(0, "", "", "", new Date(), "", "", "", 0, ""), 
    new Funcionario(0, "", "", "", "", new Date(), "", "", "", 0, ""), 
    0,                     
    0.0,                   
    new Date()             
);
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router2 = inject(Router);

  //Produto
  modalService = inject(MdbModalService);
  @ViewChild("modalProdutos") modalProdutos!: TemplateRef<any>; 
  modalRef!: MdbModalRef<any>;

  //Cliente
  modalService2 = inject(MdbModalService);
  @ViewChild("modalClientes") modalClientes!: TemplateRef<any>; 
  modalRef2!: MdbModalRef<any>;


  //Funcionario
  modalService3 = inject(MdbModalService);
  @ViewChild("modalFuncionarios") modalFuncionarios!: TemplateRef<any>; 
  modalRef3!: MdbModalRef<any>;


  vendaProdutoService = inject(VendaProdutoService);

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    } else {
      if (this.vendaProduto.id > 0) this.findById(id);
    }
  }

  findById(id: number) {
    this.vendaProdutoService.findById(id).subscribe({
      next: retorno => {
        this.vendaProduto = retorno;
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
    // Verificar se a quantidade informada é maior do que a quantidade disponível no estoque
    if (this.vendaProduto.produto.quantidade < this.vendaProduto.quantidade) {
        Swal.fire({
            title: 'Estoque insuficiente',
            text: 'Não há estoque suficiente para essa quantidade do produto.',
            icon: 'error',
            confirmButtonText: 'Ok',
        });
        return; // Não salvar a venda se a quantidade for maior do que o estoque
    }

    // Definir a data da venda como a data atual apenas para novas vendas
    if (this.vendaProduto.id === 0 && !this.vendaProduto.data_venda) {
        this.vendaProduto.data_venda = new Date(); // Defina a data de venda como a data atual para novas vendas
    }

    if (this.vendaProduto.id > 0) {
        // Atualiza a venda existente
        this.vendaProdutoService.update(this.vendaProduto, this.vendaProduto.id).subscribe({
            next: mensagem => {
                Swal.fire({
                    title: mensagem,
                    icon: 'success',
                    confirmButtonText: 'Ok',
                });
                this.router2.navigate(['venda'], { state: { vendaProdutoEditado: this.vendaProduto } });
                this.retorno.emit(this.vendaProduto);
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
        this.vendaProdutoService.save(this.vendaProduto).subscribe({
            next: mensagem => {
                Swal.fire({
                    title: mensagem,
                    icon: 'success',
                    confirmButtonText: 'Ok',
                });
                this.router2.navigate(['venda'], { state: { vendaProdutoNovo: this.vendaProduto } });
                this.retorno.emit(this.vendaProduto);
                this.resetVendaProduto();
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




  

// Método para reiniciar os dados da venda após salvar
resetVendaProduto() {
    this.vendaProduto = new VendaProduto(
        new Produto(0, "", "", 0, 0, 0, new Date()), 
        new Cliente(0, "", "", "", new Date(), "", "", "", 0, ""), 
        new Funcionario(0, "", "", "", "", new Date(), "", "", "", 0, ""), 
        0,                     
        0.0,                   
        new Date()             
    );
}



  buscarProduto(){
    this.modalRef = this.modalService.open(this.modalProdutos, {modalClass: 'modal-xl'})
  }

  retornoProduto(produto: Produto){
    this.vendaProduto.produto = produto;
    this.modalRef.close();
  }

  buscarCliente(){
    this.modalRef2 = this.modalService.open(this.modalClientes, {modalClass: 'modal-xl'})
  }
  retornoCliente(cliente: Cliente){
    this.vendaProduto.cliente = cliente;
    this.modalRef2.close();
  }


  buscarFuncionario() {
    this.modalRef3 = this.modalService.open(this.modalFuncionarios, { modalClass: 'modal-xl' });
  }
  retornoFuncionario(funcionario: Funcionario){
    this.vendaProduto.funcionario = funcionario;
    this.modalRef3.close();
  }




}
