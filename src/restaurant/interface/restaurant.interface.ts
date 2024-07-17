import { CreateRestaurantDto } from "../dto/createRestaurant.dto";
import { FilterRestaurantsDto } from "../dto/filterRestaurants.dto";
import { Restaurant } from "../restaurant.model";

export abstract class RestaurantDataGateway {
    getRestaurantByEmail: (email: string) => Promise<Restaurant>;

    getAllRestaurants: (filter: FilterRestaurantsDto) => Promise<Restaurant[]>;

    countRestaurants: () => Promise<Number>;

    createRestaurant: (Restaurant: CreateRestaurantDto) => Restaurant;

    createAndSaveRestaurant: (Restaurant: CreateRestaurantDto) => Promise<Restaurant>;

    createFirstRestaurant: (Restaurant: Restaurant) => Promise<Restaurant>;

    updateRestaurant: (email: string, Restaurant: Restaurant) => Promise<Restaurant>;

    deleteRestaurantByEmail: (email: string) => Promise<Restaurant>;

    saveRestaurant: (RestaurantModel: Restaurant) => Promise<Restaurant>;
}