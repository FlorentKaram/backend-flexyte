import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.model';
import { TemplatesModule } from 'src/extentions/templates/templates.module';
import { MongooseUser } from './services/mongoose-user.service';
import { UserDataGateway } from './interface/user.interface';


@Module({
  imports: [
    MongooseModule.forFeature([{ name : "users" , schema: UserSchema }]),
    TemplatesModule
  ],
  providers: [UsersService, { provide: UserDataGateway, useClass: MongooseUser }],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}


