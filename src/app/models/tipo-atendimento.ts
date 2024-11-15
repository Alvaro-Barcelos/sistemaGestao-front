export class TipoAtendimento {
    id!: number;
    descricao!: string;
    preco!: number;
    
    constructor(id:number, descricao:string, preco:number){
        this.id = id;
        this.descricao = descricao;
        this.preco = preco;
    }
}
