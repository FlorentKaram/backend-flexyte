import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TemplatesModule } from './extentions/templates/templates.module';
import { DisheModule } from './extentions/dishes/dishes.module';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot( process.env.DB_URL || "mongodb://localhost/nest" ),
    AuthModule, 
    UsersModule,
    TemplatesModule,
    DisheModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(){}
}
