import { Document } from 'mongoose'

// interface do jogador
export interface Jogador extends Document{
    readonly celular: String;
    readonly email: String;
    cpf: String;
    nome: String;
    ranking: String;
    posicaoRanking: Number;
    urlFoto: String;
}