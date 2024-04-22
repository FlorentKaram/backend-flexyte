import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.model';
import { TemplatesModule } from 'src/extentions/templates/templates.module';
import { MongooseUser } from './services/mongoose-user.service';
import { UserDataGateway } from './interface/user.interface';
import { SirenDataGateway } from './interface/siren.interface';
import { SirenApiService } from './services/siren.service';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [
    MongooseModule.forFeature([{ name : "users" , schema: UserSchema }]),
    TemplatesModule,
    HttpModule,
    ScheduleModule.forRoot()
  ],
  providers: [UsersService, { provide: UserDataGateway, useClass: MongooseUser }, { provide: SirenDataGateway, useClass: SirenApiService}],
  controllers: [UsersController],
  exports: [UsersService,SirenDataGateway]
})
export class UsersModule {}


