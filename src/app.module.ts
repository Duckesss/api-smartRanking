import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { PadraoModule } from './padrao/padrao.module';

@Module({
  imports: [JogadoresModule, PadraoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
