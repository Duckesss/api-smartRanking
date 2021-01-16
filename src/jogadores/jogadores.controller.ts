import { Put, Body, Controller, Delete, Get, Post, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto'
import { AtualizarJogadorDto } from './dtos/atualizar-jogador-dto'
import { JogadoresService } from './jogadores.service'
import { Jogador } from './interfaces/jogador.interface'
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe'

@Controller('/api/v1/jogadores')
export class JogadoresController {
    constructor(private readonly jogadoresService: JogadoresService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async insert(@Body() jogadorDto: CriarJogadorDto): Promise<Jogador> {
        return await this.jogadoresService.insert(jogadorDto)
    }

    @Put('/:_id')
    @UsePipes(new ValidationPipe({
        whitelist: true
    }))
    async update(
        @Body() jogadorDto: AtualizarJogadorDto,
        @Param('_id', JogadoresValidacaoParametrosPipe) _id: string
    ): Promise<Jogador> {
        return await this.jogadoresService.update(_id, jogadorDto)
    }

    @Get('/:_id')
    async getByID(
        @Param('_id', JogadoresValidacaoParametrosPipe) _id: string
    ): Promise<Jogador | Object> {
        return await this.jogadoresService.getByID(_id) || {}
    }

    @Get()
    async getAll(
    ): Promise<Jogador[]> {
        return await this.jogadoresService.getAll()
    }

    @Delete()
    async deleteAll(
    ): Promise<Object> {
        return await this.jogadoresService.deleteAll()
    };

    @Delete(':_id')
    async deleteByID(
        @Param('_id', JogadoresValidacaoParametrosPipe) _id: string
    ): Promise<Object> {
        return await this.jogadoresService.deleteByID(_id)
    };

}