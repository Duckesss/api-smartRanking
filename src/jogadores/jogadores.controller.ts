import { Body, Controller, Get, Post } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto'
import { JogadoresService } from './jogadores.service'

@Controller('/api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService : JogadoresService){}

    @Post()
    async upsert(@Body() jogadorDto : CriarJogadorDto){
        var jogadorCriado = await this.jogadoresService.upsert(jogadorDto)
        return jogadorCriado
    }
    @Get('')
    getJogadores(){
        return this.jogadoresService.getJogadores()
    }
}
