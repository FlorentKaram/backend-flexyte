import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.model';
import { TemplatesModule } from 'src/extentions/templates/templates.module';
import { MongooseUser } from './services/mongoose-user.service';
import { UserDataGateway } from './interface/user.interface';
import { SirenDataGateway } from './interface/siren.interface';
import { SirenApiService } from './services/siren.service';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersController } from './controllers/users.controller';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name : "users" , schema: UserSchema }]),
    TemplatesModule,
    HttpModule,
    ScheduleModule.forRoot()
  ],
  providers: [UsersService, AdminService,{ provide: UserDataGateway, useClass: MongooseUser }, { provide: SirenDataGateway, useClass: SirenApiService}],
  controllers: [UsersController, AdminController],
  exports: [UsersService,SirenDataGateway]
})
export class UsersModule {}


