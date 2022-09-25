import mongoose from 'mongoose';
import { MongoConfig } from '../../config/mongodb';
import { Document } from 'mongoose';

export class CreatePlayerDto {
  readonly phoneNumber: string;
  readonly email: string;
  readonly name: string;
}

export interface Player extends Document {
  readonly id: string;
  readonly phoneNumber: string;
  readonly email: string;
  name: string;
  ranking: string;
  rankingPosition: number;
  photoUrl: string;
}

export const PlayerSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, unique: true },
    email: { type: String, unique: true },
    name: { type: String },
    ranking: { type: String },
    rankingPosition: { type: String },
    photoUrl: { type: String },
  },
  { timestamps: true, collection: MongoConfig.players.collectionName },
);
