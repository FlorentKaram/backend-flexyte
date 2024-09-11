import { CreateRestaurantDto } from '../dto/createRestaurant.dto';
import { Restaurant } from '../restaurant.model';

export abstract class RestaurantDataGateway {
  getRestaurantByEmail: (email: string) => Promise<Restaurant>;

  getAllRestaurants: () => Promise<Restaurant[]>;

  getRestaurantByCompanyName: (email: string) => Promise<Restaurant>;

  createRestaurant: (Restaurant: CreateRestaurantDto) => Restaurant;

  createAndSaveRestaurant: (
    Restaurant: CreateRestaurantDto,
  ) => Promise<Restaurant>;

  createFirstRestaurant: (Restaurant: Restaurant) => Promise<Restaurant>;

  updateRestaurant: (
    email: string,
    Restaurant: Restaurant,
  ) => Promise<Restaurant>;

  deleteRestaurantByEmail: (email: string) => Promise<Restaurant>;

  saveRestaurant: (RestaurantModel: Restaurant) => Promise<Restaurant>;
}
