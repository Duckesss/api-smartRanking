import { IsOptional } from 'class-validator';
// objeto que o cliente vai enviar
export class AtualizarJogadorDto {
    @IsOptional()
    readonly celular: string;
    @IsOptional()
    readonly nome: string;
    @IsOptional()
    readonly ranking: string;
    @IsOptional()
    readonly posicaoRanking: Number;
}