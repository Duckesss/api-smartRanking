import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    PlayersModule,
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_URL),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
