import { Module, Res } from '@nestjs/common';
import { RestaurantService } from './services/restaurant.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantSchema } from './restaurant.model';
import { TemplatesModule } from 'src/extentions/templates/templates.module';
import { SirenDataGateway } from './interface/siren.interface';
import { SirenApiService } from './services/siren.service';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { RestaurantController } from './controllers/restaurant.controller';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.service';
import { RestaurantDataGateway } from './interface/restaurant.interface';
import { MongooseRestaurant } from './services/mongoose-restaurant.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name : "restaurants" , schema: RestaurantSchema }]),
    TemplatesModule,
    HttpModule,
    ScheduleModule.forRoot()
  ],
  providers: [RestaurantService, AdminService,{ provide: RestaurantDataGateway, useClass: MongooseRestaurant }, { provide: SirenDataGateway, useClass: SirenApiService}],
  controllers: [RestaurantController, AdminController],
  exports: [RestaurantService,SirenDataGateway]
})
export class RestaurantModule {}


