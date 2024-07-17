import { HydratedDocument, Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { FilterRestaurantsDto } from "../dto/filterRestaurants.dto";
import { RestaurantDataGateway } from "../interface/restaurant.interface";
import { CreateRestaurantDto } from "../dto/createRestaurant.dto";
import { Restaurant } from "../restaurant.model";

@Injectable()
export class MongooseRestaurant implements RestaurantDataGateway {
    constructor(@InjectModel('restaurants') private readonly restaurantModel: Model<Restaurant>) { }

    getAllRestaurants = async (filter: FilterRestaurantsDto) => {
        return this.restaurantModel
            .find({
                companyName: {
                    $regex: filter.filterCompanyName, $options: "i"
                }
            },
                [
                    "companyName", 
                    "email", 
                    "companyDescription", 
                    "streetAddress1",
                    "streetAddress2",
                    "zipCode",
                    "state",
                    "pickedTemplate",
                ]
            )
            .limit(filter.restaurantPerPage)
            .skip(filter.currentPage * filter.restaurantPerPage);
    };

    countRestaurants = async () => {
        return this.restaurantModel.countDocuments();
    }

    getRestaurantByEmail = async (email: string) => {
        return this.restaurantModel.findOne({ email: email });
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
    }

}
