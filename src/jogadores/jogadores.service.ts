import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto'
import { Jogador } from './interfaces/jogador.interface'
import { v4 as uuid } from 'uuid'

@Injectable()
export class JogadoresService {
    private readonly logger = new Logger(JogadoresService.name)
    private jogadores : Jogador[] = []
    private notFound : Object = {
        success: 1,
        msg: 'Jogador não encontrado'
    }
    private find(
        parametros: {
            cpf?: String,
            email?: String
        },
        intercept : Function = _ => (null)
    ){
        if(Object.values(parametros).every(e => e === undefined))
            return this.notFound
        parametros.email = this.trataEmail(parametros.email)
        var retorno = this.jogadores.find((e,i) => {
            intercept(e,i)
            if(parametros.cpf)
                return e.cpf == parametros.cpf
            if(parametros.email)
                return e.email == parametros.email
        })
        return retorno || this.notFound
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
    private trataEmail(email: String | undefined){
        if(email)
            return email.replace(/%40/g,'@').replace(/%20/g,',').replace(/%30/g,'.')
        return email
    }
    async getJogadores(cpf = null,email = null): Promise<Jogador[] | Jogador | Object>{
        if(!cpf && !email)
            return this.jogadores   // se nao tem cpf retorna todos os jogadores
        if(cpf)            
            return this.find({cpf})
        if(email)            
            return this.find({email})
    }

    async deleteJogadores(cpf = null): Promise<Jogador[] | Jogador | Object>{
        if(!cpf){
            var jogadores = this.jogadores
            this.jogadores = []
            return {
                success: 1,
                msg: "Jogadores deletados com sucesso",
                resposta: jogadores
            }
        }else{
            var indexDeletar = null
            var jogador = this.find({cpf},(e,i) => {
                if(e.cpf == cpf)
                    indexDeletar = i
            })
            this.jogadores.splice(indexDeletar,1)
            return jogador
        }
    }
    
    async upsert(jogadorDto : CriarJogadorDto) : Promise<Jogador> {
        var jogador = this.verificaExistencia(jogadorDto)
        if(!jogador)
            return await this.criar(jogadorDto)
        return await this.update(jogador, jogadorDto)   
    }
}
