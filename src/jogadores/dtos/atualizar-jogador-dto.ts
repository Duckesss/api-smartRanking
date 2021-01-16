import { IsNumber, IsOptional, IsString } from 'class-validator';
// objeto que o cliente vai enviar
export class AtualizarJogadorDto {
    @IsString()
    @IsOptional()
    readonly celular: string;
    @IsString()
    @IsOptional()
    readonly nome: string;
    @IsString()
    @IsOptional()
    readonly ranking: string;
    @IsNumber()
    @IsOptional()
    readonly posicaoRanking: Number;
}