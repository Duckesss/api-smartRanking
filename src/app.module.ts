import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from './categorias/categorias.module';

const strConnection = 'mongodb+srv://mateushfm:oiapoque12@cluster0.ejos5.gcp.mongodb.net/smartRanking?retryWrites=true&w=majority'
const mongoParams = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }
@Module({
  imports: [
    MongooseModule.forRoot(strConnection, mongoParams),
    JogadoresModule,
    CategoriasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
