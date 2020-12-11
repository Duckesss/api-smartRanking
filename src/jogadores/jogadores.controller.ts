import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto'
import { JogadoresService } from './jogadores.service'
import { Jogador } from './interfaces/jogador.interface'

@Controller('/api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService : JogadoresService){}

    @Post()
    async upsert(@Body() jogadorDto : CriarJogadorDto){
        var jogadorCriado = await this.jogadoresService.upsert(jogadorDto)
        return jogadorCriado
    }
    @Get()
    async getJogadores(
         @Query('cpf') cpf: string,
         @Query('email') email : string
    ) : Promise<Jogador[] | Jogador | Object>{
        return await this.jogadoresService.getJogadores(cpf,email)
    }
    @Delete()
    async deleteJogadores( @Query('cpf') cpf: string) : Promise<Jogador[] | Jogador | Object>{
        return await this.jogadoresService.deleteJogadores(cpf)
    }
}

