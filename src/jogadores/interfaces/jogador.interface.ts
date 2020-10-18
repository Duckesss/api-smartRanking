// interface do jogador
export interface Jogador{
    readonly _id: String;
    readonly celular: String;
    readonly email: String;
    nome: String;
    ranking: String;
    posicaoRanking: Number;
    urlFoto: String;
}
