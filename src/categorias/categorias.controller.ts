import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CategoriasService } from './categorias.service';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto'
import { Categoria } from './interfaces/categoria.interface'
import { IncluirJogadorCategoriaDto } from './dtos/incluir-jogador-categoria.dto';

@Controller('/api/v1/categorias')
export class CategoriasController {
    constructor(private readonly categoriasService: CategoriasService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async create(
        @Body() categoriaDto: CriarCategoriaDto
    ): Promise<Categoria> {
        return await this.categoriasService.create(categoriaDto)
    }

    @Post('/:categoria/jogadores/:idJogador')
    async atribuirCategoriaJogador(
        @Param() params: IncluirJogadorCategoriaDto
    ): Promise<Categoria> {
        return await this.categoriasService.atribuirCategoriaJogador(params)
    }


    @Put('/:categoria')
    @UsePipes(ValidationPipe)
    async update(
        @Body() categoriaDto: AtualizarCategoriaDto,
        @Param('categoria') categoria: string
    ): Promise<Categoria> {
        return await this.categoriasService.update(categoria, categoriaDto)
    }

    @Get()
    async getAll(): Promise<Array<Categoria>> {
        return await this.categoriasService.getAll()
    }

    @Get('/:categoria')
    async getByCategoria(
        @Param('categoria') categoria: string
    ): Promise<Categoria> {
        return await this.categoriasService.getByCategoria(categoria)
    }
}
