export class Funcionario {
    id!:number;
    nome!: string;
    cargo!: string;
    telefone!: string;
    email!: string;
    data_nascimento!: Date;
    cpf!: string;
    endereco!: string;
    bairro!: string;
    numero!: number;
    cidade!: string;

    constructor(id: number, nome: string, cargo: string, telefone: string, email: string, data_nascimento: Date, cpf: string, endereco: string, bairro: string, numero: number, cidade: string) {
        this.id = id;
        this.nome = nome;
        this.cargo = cargo;
        this.telefone = telefone;
        this.email = email;
        this.data_nascimento = data_nascimento;
        this.cpf = cpf;
        this.endereco = endereco;
        this.bairro = bairro;
        this.numero = numero;
        this.cidade = cidade;
    }
}
