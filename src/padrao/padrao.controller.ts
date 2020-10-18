import { Controller, Get } from '@nestjs/common';
const app_info = require('../../package.json')
@Controller('')
export class PadraoController {
    @Get()
    versao(){
        return {
            name: app_info.name,
            desc: "Controle de ranking de tênis.Curso de NEST.js",
            version: app_info.version,
        }
    }
}
