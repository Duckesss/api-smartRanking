import { Injectable, Logger } from '@nestjs/common';
import { PlayerTypes } from './types';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);
  constructor(
    @InjectModel('Player')
    private readonly playerModel: Model<PlayerTypes.Player>,
  ) {}

  private async create(
    dto: PlayerTypes.CreatePlayerDto,
  ): Promise<PlayerTypes.Player> {
    this.logger.log(`create player: ${JSON.stringify(dto)}`);
    const newPlayer = new this.playerModel(dto);
    return newPlayer.save();
  }

  private async update(player: PlayerTypes.CreatePlayerDto) {
    this.playerModel
      .findOneAndUpdate(
        {
          email: player.email,
        },
        {
          $set: player,
        },
      )
      .exec();
  }

  getAll(): Promise<PlayerTypes.Player[]> {
    return this.playerModel.find().exec();
  }

  async getOne(email: string): Promise<PlayerTypes.Player[]> {
    const player = await this.playerModel.findOne({ email }).exec();

    return [player];
  }

  delete(email: string) {
    return this.playerModel.remove({ email }).exec();
  }

  async upsertPlayer(createPlayerDto: PlayerTypes.CreatePlayerDto) {
    const { email } = createPlayerDto;

    const foundPlayer = await this.playerModel
      .findOne({
        email,
      })
      .exec();

    if (foundPlayer) {
      await this.update(createPlayerDto);
    } else {
      await this.create(createPlayerDto);
    }
  }
}
