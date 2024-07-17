import { Injectable, OnModuleInit } from '@nestjs/common';
import { RestaurantService } from './restaurant/services/restaurant.service';
import { SirenApiService } from './restaurant/services/siren.service';
import { SirenDataGateway } from './restaurant/interface/siren.interface';

@Injectable()
export class AppService implements OnModuleInit {

  constructor(private readonly restaurantService: RestaurantService, private sirenDataGateway: SirenDataGateway) { }
  onModuleInit() {
    this.sirenDataGateway.getToken();
    this.restaurantService.createFirstRestaurant();
  }
}
