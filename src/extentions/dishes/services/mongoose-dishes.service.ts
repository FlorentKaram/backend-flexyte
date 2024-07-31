import { Injectable, NotFoundException } from "@nestjs/common";
import { DishesDataGateway } from "../interface/dishes.interface";
import { InjectModel } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";
import { Dish } from "../dishes.model";

@Injectable()
export class MongooseDishes implements DishesDataGateway {
    constructor(@InjectModel('dishes') private readonly dishesModel: Model<Dish>) { }

    getAllDishes = async (companyName: string) => {
        return this.dishesModel.find({companyName: companyName}); 
    }

    getOneDish = async (id: string) => {
        return this.dishesModel.findById(id);
    }

    createDish = async (dish: Dish) => {
        return this.dishesModel.create(dish);
    }

    findAndDeleteDish = async (id: string) => {
        let dish = await this.dishesModel.findByIdAndDelete(id);
        if (!dish) {
            throw new NotFoundException('Dish not found');
        }
        return dish;
    }

    saveDish = async (dish: HydratedDocument<Dish>) => {
        return dish.save();
    }
}