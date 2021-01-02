import { Module } from '@nestjs/common';
import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';
import { MongooseModule } from '@nestjs/mongoose'
import { JogadorSchema } from './interfaces/jogador.schema';

const mongooseModel = [{
	name: 'Jogador',
	schema: JogadorSchema
}]

@Module({
  imports: [MongooseModule.forFeature(mongooseModel)],
  controllers: [JogadoresController],
  providers: [JogadoresService]
})
export class JogadoresModule {}
