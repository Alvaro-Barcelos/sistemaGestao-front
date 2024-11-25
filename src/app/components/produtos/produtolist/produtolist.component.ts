import { Component, EventEmitter, inject, Input, input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Produto } from '../../../models/produto';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ProdutodetailsComponent} from '../produtodetails/produtodetails.component';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ProdutoService } from '../../../services/produto.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-produtolist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, ProdutodetailsComponent],
  templateUrl: './produtolist.component.html',
  styleUrl: './produtolist.component.scss'
})
export class ProdutolistComponent {
  data1 = new Date('2021-04-23T10:00:00.000Z');
  lista: Produto[] = [];
  produtoEdit: Produto = new Produto(0,"","",0,0,0,this.data1);


  @Input("esconderBotoes") esconderBotoes: boolean = false;
  @Output("retorno") retorno = new EventEmitter<any>();

  // ELEMENTOS DA MODAL
  modalService = inject(MdbModalService); // para conseguir abrir a modal
  @ViewChild("modalProdutoDetalhe") modalProdutoDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  produtoService = inject(ProdutoService);

  constructor() {
    this.findAll();

    let produtoNovo = history.state.produtoNovo;
    let produtoEditado = history.state.produtoEditado;

    if (produtoNovo != null) {
      produtoNovo.id = 555;
      this.lista.push(produtoNovo);
    }

    if (produtoEditado != null) {
      let indice = this.lista.findIndex((x) => {
        return x.id == produtoEditado.id;
      });
      this.lista[indice] = produtoEditado;
    }
  }

  findAll() {
    this.produtoService.findAll().subscribe({
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

  deleteById(produto: Produto) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.produtoService.delete(produto.id).subscribe({
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
    this.produtoEdit = new Produto(0,"","",0,0,0,this.data1);
    this.modalRef = this.modalService.open(this.modalProdutoDetalhe);
  }

  edit(produto: Produto) {
    this.produtoEdit = Object.assign({}, produto); // clonando para evitar referência de objeto
    this.modalRef = this.modalService.open(this.modalProdutoDetalhe);
  }

  retornoDetalhe(produto: Produto) {
    this.findAll();
    this.modalRef.close();
  }

  select(produto: Produto){
    this.retorno.emit(produto);
  }
}
