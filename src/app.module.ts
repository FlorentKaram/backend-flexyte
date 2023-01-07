import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DisheModule } from './dishe/dishe.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot( process.env.DB_URL || "mongodb://localhost:27017/monProjet" ),
    AuthModule, 
    UsersModule,
    DisheModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
