import * as mongoose from 'mongoose'
export const JogadorSchema = new mongoose.Schema({
    celular: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    cpf: {
        type: String,
        unique: true,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    ranking: {
        type: String,
        default: ''
    },
    posicaoRanking: {
        type: Number,
        default: 0
    },
    urlFoto: {
        type: String,
        default: ''
    }
}, { timestamps: true, collection: 'jogadores' })
