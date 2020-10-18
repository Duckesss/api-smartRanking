import { Body, Controller, Post } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto'

@Controller('/api/v1/jogadores')
export class JogadoresController {
    
    @Post()
    async upsert(@Body() jogador : CriarJogadorDto){
        return jogador
    }

}
