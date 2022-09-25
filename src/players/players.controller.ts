import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayerTypes } from './types';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playerService: PlayersService) {}

  @Post()
  async upsertPlayer(@Body() createPlayerDto: PlayerTypes.CreatePlayerDto) {
    await this.playerService.upsertPlayer(createPlayerDto);
  }

  @Get()
  async getPlayers(
    @Query('email') email: string,
  ): Promise<PlayerTypes.Player[]> {
    if (email) {
      return this.playerService.getOne(email);
    }
    return this.playerService.getAll();
  }

  @Delete()
  async deletePlayer(@Query('email') email: string) {
    await this.playerService.delete(email);
  }
}
