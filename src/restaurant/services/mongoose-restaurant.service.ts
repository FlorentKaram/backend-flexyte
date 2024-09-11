import { HydratedDocument, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { RestaurantDataGateway } from '../interface/restaurant.interface';
import { CreateRestaurantDto } from '../dto/createRestaurant.dto';
import { Restaurant } from '../restaurant.model';

@Injectable()
export class MongooseRestaurant implements RestaurantDataGateway {
  constructor(
    @InjectModel('restaurants')
    private readonly restaurantModel: Model<Restaurant>,
  ) {}

  getAllRestaurants = async () => {
    return this.restaurantModel.find();
  };

  getRestaurantByEmail = async (email: string) => {
    return this.restaurantModel.findOne({ email: email });
  };

  getRestaurantByCompanyName = async (companyName: string) => {
    return this.restaurantModel.findOne({ companyName: companyName });
  };

  createRestaurant = (restaurant: CreateRestaurantDto) => {
    return new this.restaurantModel(restaurant);
  };

  createAndSaveRestaurant = async (restaurant: CreateRestaurantDto) => {
    return this.restaurantModel.create(restaurant);
  };

  createFirstRestaurant = async (restaurant: Restaurant) => {
    return this.restaurantModel.create(restaurant);
  };

  updateRestaurant = async (email: string, restaurant: Restaurant) => {
    return this.restaurantModel.findOneAndUpdate({ email: email }, restaurant);
  };

  deleteRestaurantByEmail = async (email: string) => {
    return this.restaurantModel.findOneAndDelete({ email: email });
  };

  saveRestaurant = async (restaurant: HydratedDocument<Restaurant>) => {
    return restaurant.save();
  };
}
