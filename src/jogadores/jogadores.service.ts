import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto'
import { Jogador } from './interfaces/jogador.interface'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>){}

    // verifica se o jogador ja existe pelo seu cpf
    private async verificaExistencia(jogadorDto : CriarJogadorDto){
        const {cpf} = jogadorDto
        const jogador = await this.jogadorModel.findOne({cpf}).exec();
        return jogador
    }

    private async update(jogadorDto : CriarJogadorDto) : Promise<Jogador> {
        const busca = {
            cpf: jogadorDto.cpf
        }
        const alteracao = {$set: jogadorDto}
        return await this.jogadorModel.findOneAndUpdate(busca,alteracao).exec()
    }
    private async criar(jogadorDto : CriarJogadorDto) : Promise<Jogador> {
        const jogadorCriado = new this.jogadorModel(jogadorDto)
        return await jogadorCriado.save()
    }

    async getJogadores(cpf : string,email : string): Promise<Jogador[] | Jogador>{
        if(!cpf && !email)
            return await this.jogadorModel.find()   // pega todos os jogadores
        if(cpf)            
            return await this.jogadorModel.findOne({cpf})
        if(email)            
            return await this.jogadorModel.findOne({email})
    }

    async deleteJogador(cpf : string): Promise<Object>{
        return await this.jogadorModel.deleteOne({cpf}).exec()
    }
    
    async clearDataBase() : Promise<Object>{
        return await this.jogadorModel.deleteMany({})
    }

    async upsert(jogadorDto : CriarJogadorDto) : Promise<Jogador> {
        const jogador = await this.verificaExistencia(jogadorDto)
        if(!jogador)
            return await this.criar(jogadorDto)
        return await this.update(jogadorDto)   
    }
}
