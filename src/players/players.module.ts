import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerTypes } from '../types';
import { MongoConfig } from '../config/mongodb';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MongoConfig.players.schemaName,
        schema: PlayerTypes.PlayerSchema,
      },
    ]),
  ],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
