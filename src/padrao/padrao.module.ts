import { Module } from '@nestjs/common';
import { PadraoController } from './padrao.controller';

@Module({
  controllers: [PadraoController]
})
export class PadraoModule {}
