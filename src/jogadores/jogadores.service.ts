import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto'
import { Jogador } from './interfaces/jogador.interface'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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

    async update(_id: string, jogadorDto: CriarJogadorDto): Promise<Jogador> {
        if (!await this.exists({ _id }))
            throw new NotFoundException(`Jogador de id ${_id} não encontrado`)
        return this.jogadorModel.findOneAndUpdate({ _id }, { $set: jogadorDto }, { returnOriginal: false }).exec()
    }

    async getByID(_id: string): Promise<Jogador> {
        return this.exists({ _id })
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
}
