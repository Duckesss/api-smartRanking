import { IsNotEmpty, IsString } from "class-validator";
import { Jogador } from "src/jogadores/interfaces/jogador.interface";
export class IncluirJogadorCategoriaDto {
    @IsString()
    @IsNotEmpty()
    categoria: string;
    @IsString()
    @IsNotEmpty()
    idJogador: Jogador
}