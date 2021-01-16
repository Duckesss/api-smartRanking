import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto'
import { AtualizarJogadorDto } from './dtos/atualizar-jogador-dto'
import { Jogador } from './interfaces/jogador.interface'
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class JogadoresService {
    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) { }

    async insert(jogadorDto: CriarJogadorDto): Promise<Jogador> {
        const { cpf, email } = jogadorDto
        if (await this.exists({ cpf }))
            throw new BadRequestException(`CPF ${cpf} já existe.`)
        if (await this.exists({ email }))
            throw new BadRequestException(`Email ${email} já existe.`)

        const novoJogador = new this.jogadorModel(jogadorDto)
        return novoJogador.save()
    }

    async update(_id: string, jogadorDto: AtualizarJogadorDto): Promise<Jogador> {
        if (!await this.exists({ _id }))
            throw this.jogadorNotFound(_id)
        return this.jogadorModel.findOneAndUpdate({ _id }, { $set: jogadorDto }, { returnOriginal: false }).exec()
    }

    async getByID(_id: string): Promise<Jogador> {
        const idValido = Types.ObjectId.isValid(_id)
        if (!idValido)
            throw new BadRequestException(`ID ${_id} não é valido.`)
        const jogador = await this.exists({ _id })
        if (!jogador)
            throw this.jogadorNotFound(_id)
        return jogador

    }

    async getAll(): Promise<Jogador[]> {
        return this.jogadorModel.find()
    }


    async deleteAll(): Promise<Object> {
        return this.jogadorModel.deleteMany({})
    }

    async deleteByID(_id: string): Promise<Object> {
        return this.jogadorModel.deleteOne({ _id }).exec()
    }


    private exists(params: object): Promise<Jogador> {
        return this.jogadorModel.findOne(params).exec();
    }

    private jogadorNotFound(_id: string) {
        return new NotFoundException(`Jogador de id ${_id} não encontrado`)
    }
}
