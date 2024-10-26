import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Produto } from '../../../models/produto';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProdutoService } from '../../../services/produto.service';

import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-produtosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './produtodetails.component.html',
  styleUrl: './produtodetails.component.scss'
})
export class ProdutodetailsComponent {
  data1 = new Date('2021-04-23T10:00:00.000Z');
  @Input("produto") produto: Produto = new Produto(0, "", "", 0, 0, 0, this.data1);
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router2 = inject(Router);

  

  produtoService = inject(ProdutoService);

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    } else {
      if (this.produto.id > 0) this.findById(id);
    }
  }

  findById(id: number) {
    this.produtoService.findById(id).subscribe({
      next: retorno => {
        this.produto = retorno;
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
    if (this.produto.id > 0) {
      this.produtoService.update(this.produto, this.produto.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['produtos'], { state: { produtoEditado: this.produto } });
          this.retorno.emit(this.produto);
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
      this.produtoService.save(this.produto).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['produtos'], { state: { produtoNovo: this.produto } });
          this.retorno.emit(this.produto);
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
