import { Cliente } from "./cliente";
import { Funcionario } from "./funcionario";
import { TipoAtendimento } from "./tipo-atendimento";

export class Atendimento {
    id!: number;
    funcionario!: Funcionario;
    cliente!: Cliente;
    tipo_atendimento!: TipoAtendimento;
    data_atendimento!: Date;
    hora_atendimento!: Date; 
    observacao!: string;

    constructor(id: number, funcionario: Funcionario, cliente: Cliente, tipo_atendimento: TipoAtendimento, data_atendimento: Date, hora_atendimento: Date, observacao: string) {
        this.id = id;
        this.funcionario = funcionario;
        this.cliente = cliente;
        this.tipo_atendimento = tipo_atendimento;
        this.data_atendimento = data_atendimento;
        this.hora_atendimento = hora_atendimento;
        this.observacao = observacao;
    }
}