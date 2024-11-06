import { Cliente } from "./cliente";
import { Funcionario } from "./funcionario";
import { Produto } from "./produto";

export class VendaProduto {
    id!: number;
    produto!: Produto;
    cliente!: Cliente;
    funcionario!: Funcionario;
    quantidade!: number;
    valor_total!: number;
    data_venda!: Date;
  
    constructor(
      produto: Produto,
      cliente: Cliente,
      funcionario: Funcionario,
      quantidade: number,
      valorTotal: number,
      dataVenda: Date
    ) {
      this.produto = produto;
      this.cliente = cliente;
      this.funcionario = funcionario;
      this.quantidade = quantidade;
      this.valor_total = valorTotal;
      this.data_venda = dataVenda;
    }
  }