import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categoria } from './interfaces/categoria.interface'
import { Model } from 'mongoose'
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto'
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { IncluirJogadorCategoriaDto } from './dtos/incluir-jogador-categoria.dto';
import { JogadoresService } from 'src/jogadores/jogadores.service';

@Injectable()
export class CategoriasService {

    constructor(
        @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
        private readonly jogadoresService: JogadoresService
    ) { }

    async create(categoriaDto: CriarCategoriaDto): Promise<Categoria> {
        const { categoria } = categoriaDto
        if (await this.exists({ categoria }))
            throw new BadRequestException(`Categoria ${categoria} já cadastrada`)

        const categoriaCriada = new this.categoriaModel(categoriaDto)
        return categoriaCriada.save()
    }

    async getAll(): Promise<Array<Categoria>> {
        return this.categoriaModel.find().populate("jogadores").exec()
    }

    async getByCategoria(categoria: string): Promise<Categoria> {
        const categoriaEncontrada = await this.exists({ categoria })
        if (!categoriaEncontrada)
            throw this.categoriaNotFound(categoria)
        return categoriaEncontrada
    }

    async update(
        categoria: string, categoriaDto: AtualizarCategoriaDto
    ): Promise<Categoria> {
        if (!await this.exists({ categoria }))
            throw this.categoriaNotFound(categoria)
        return this.updateCategoria(categoria, categoriaDto)
    }

    async atribuirCategoriaJogador(
        params: IncluirJogadorCategoriaDto
    ): Promise<Categoria> {
        const { categoria, idJogador } = params
        const categoriaEncontrada = await this.exists({ categoria })
        if (!categoriaEncontrada)
            throw this.categoriaNotFound(categoria)

        const _id = <string>(<unknown>idJogador)
        await this.jogadorExiste(_id)
        await this.jogadorJaCadastrado(_id, categoria)
        categoriaEncontrada.jogadores.push(idJogador)
        return await this.updateCategoria(categoria, categoriaEncontrada)
    }

    private async jogadorJaCadastrado(
        _id: string,
        categoria: string
    ): Promise<void> {
        const encontrou = await this.categoriaModel.find({ categoria }).where('jogadores').in([_id]).exec()
        if (encontrou)
            throw new BadRequestException(`Jogador ${_id} já cadastrado na categoria ${categoria}`)
    }

    private async jogadorExiste(_id: string): Promise<void> {
        await this.jogadoresService.getByID(_id)
    }

    private updateCategoria(categoria: string, updateObject: Object) {
        return this.categoriaModel.findOneAndUpdate({ categoria }, { $set: updateObject }, { returnOriginal: false }).populate("jogadores").exec()
    }

    private exists(params: Object) {
        return this.categoriaModel.findOne(params).exec()
    }

    private categoriaNotFound(categoria: string) {
        return new NotFoundException(`A categoria ${categoria} não foi encontrada`)
    }
}
