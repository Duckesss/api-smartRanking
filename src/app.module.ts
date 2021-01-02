import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { PadraoModule } from './padrao/padrao.module';
import { MongooseModule } from '@nestjs/mongoose';

const strConnection = 'mongodb+srv://mateushfm:oiapoque12@cluster0.ejos5.gcp.mongodb.net/smartRanking?retryWrites=true&w=majority'
const mongoParams = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false}
@Module({
  imports: [
    MongooseModule.forRoot(strConnection,mongoParams),
    JogadoresModule, 
    PadraoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
