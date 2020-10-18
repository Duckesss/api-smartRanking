import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto'
import { Jogador } from './interfaces/jogador.interface'
import { v4 as uuid } from 'uuid'

@Injectable()
export class JogadoresService {
    private readonly logger = new Logger(JogadoresService.name)
    private jogadores : Jogador[] = []

    getJogadores(){
        return this.jogadores
    }

    async upsert(jogadorDto : CriarJogadorDto) : Promise<Jogador> {
        this.logger.log(`Cria jogador dto:`)
        this.logger.log(jogadorDto)
        var jogador = this.verificaExistencia(jogadorDto)
        if(!jogador)
            return await this.criar(jogadorDto)
        return await this.update(jogador, jogadorDto)   
    }

    // verifica se o jogador ja existe pelo seu cpf
    private verificaExistencia(jogadorDto : CriarJogadorDto){
        var jogador = this.jogadores.find(e => e.cpf == jogadorDto.cpf)
        return jogador
    }

    private update(jogador : Jogador, jogadorDto : CriarJogadorDto) : Jogador {
        for(var key in jogadorDto)
            jogador[key] = jogadorDto[key]
        return jogador
    }

    private criar(jogadorDto : CriarJogadorDto) : Jogador {
        const { celular , email, nome, cpf } = jogadorDto;
        const jogador: Jogador = {
            _id: uuid(),
            nome, celular, email, cpf,
            ranking: 'A',
            posicaoRanking: 1,
            urlFoto: 'https://www.google.com',
        }
        this.jogadores.push(jogador)
        return jogador
    }

}
