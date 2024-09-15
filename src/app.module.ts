import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TemplatesModule } from './extentions/templates/templates.module';
import { DishModule } from './extentions/dishes/dishes.module';
import { ReservationModule } from './extentions/reservation/reservation.module';
import { TeamModule } from './extentions/team/team.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot( process.env.DB_URL || "mongodb://localhost:27017/flexyte" ),
    AuthModule, 
    RestaurantModule,
    TemplatesModule,
    DishModule,
    ReservationModule,
    TeamModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(){}
}
