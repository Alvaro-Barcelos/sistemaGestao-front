export class Produto {
    id!: number;
    nome_produto!: string;
    marca!: string;
    preco_custo!: number; 
    preco_venda!: number;
    quantidade!: number;
    data_validade!: Date;

    constructor(id: number, nome_produto: string, marca: string, preco_custo: number, preco_venda: number, quantidade: number, data_validade: Date){
        this.id = id;
        this.nome_produto = nome_produto;
        this.marca = marca;
        this.preco_custo = preco_custo;
        this.preco_venda = preco_venda;
        this.quantidade = quantidade;
        this.data_validade = data_validade;
    }
}
