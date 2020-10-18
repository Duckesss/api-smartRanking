import { Module } from '@nestjs/common';
import { PadraoController } from './padrao.controller';

@Module({
  controllers: [PadraoController],
  providers: []
})
export class PadraoModule {}
