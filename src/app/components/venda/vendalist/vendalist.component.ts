import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { VendaProduto } from '../../../models/VendaProduto';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { VendaProdutoService } from '../../../services/vendaproduto.service';
import { Produto } from '../../../models/produto';
import { Cliente } from '../../../models/cliente';
import { Funcionario } from '../../../models/funcionario';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { VendadetailsComponent } from '../vendadetails/vendadetails.component';

@Component({
  selector: 'app-vendalist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, VendadetailsComponent],
  templateUrl: './vendalist.component.html',
  styleUrl: './vendalist.component.scss'
})
export class VendalistComponent {
  data1 = new Date('2021-04-23T10:00:00.000Z');
  lista: VendaProduto[] = []; 
  VendaProdutoEdit!: VendaProduto; 

  // ELEMENTOS DA MODAL
  modalService = inject(MdbModalService);
  @ViewChild("modalVendaProdutoDetalhe") modalVendaProdutoDetalhe!: TemplateRef<any>; 
  modalRef!: MdbModalRef<any>;

  VendaProdutoService = inject(VendaProdutoService); 
  constructor() {
    this.findAll();

    // Remova a lógica que atribui um ID fixo ao novo produto
    let VendaProdutoNovo = history.state.VendaProdutoNovo; 
    let VendaProdutoEditado = history.state.VendaProdutoEditado;

    if (VendaProdutoNovo) {
        this.lista.push(VendaProdutoNovo); // Adiciona nova venda à lista
    }

    if (VendaProdutoEditado) {
        let indice = this.lista.findIndex((x) => x.id === VendaProdutoEditado.id);
        if (indice !== -1) {
            this.lista[indice] = VendaProdutoEditado; // Atualiza a venda existente
        }
    }
  }

  findAll() {
    this.VendaProdutoService.findAll().subscribe({
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

  deleteById(vendaProduto: VendaProduto) { 
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.VendaProdutoService.delete(vendaProduto.id).subscribe({
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

    this.VendaProdutoEdit = new VendaProduto(
        new Produto(0, "", "", 0, 0, 0, new Date()), 
        new Cliente(0, "", "", "", new Date(), "", "", "", 0, ""), 
        new Funcionario(0, "", "", "", "", new Date(), "", "", "", 0, ""), 
        0,                     
        0.0,                   
        new Date()             
    );
    this.modalRef = this.modalService.open(this.modalVendaProdutoDetalhe);
}



  edit(vendaProduto: VendaProduto) { 
    this.VendaProdutoEdit = Object.assign({}, vendaProduto); 
    this.modalRef = this.modalService.open(this.modalVendaProdutoDetalhe); 
  }

  retornoDetalhe(vendaProduto: VendaProduto) {
    this.findAll();  
    this.modalRef.close();  
}

}
