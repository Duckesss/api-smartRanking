// objeto que o cliente vai enviar
export class AtualizarJogadorDto {
    readonly celular: string;
    readonly nome: string;
    readonly cpf: string;
    readonly ranking: string;
    readonly posicaoRanking: Number;
}