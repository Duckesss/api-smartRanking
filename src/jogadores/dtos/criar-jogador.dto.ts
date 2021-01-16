import { IsNotEmpty, IsEmail } from 'class-validator';

// objeto que o cliente vai enviar
export class CriarJogadorDto {

    @IsNotEmpty()
    readonly celular: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    nome: string;

    @IsNotEmpty()
    cpf: string;
    ranking: string;
    posicaoRanking: Number;
}