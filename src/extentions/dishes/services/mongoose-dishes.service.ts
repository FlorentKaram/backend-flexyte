import { Injectable, NotFoundException } from "@nestjs/common";
import { DishesDataGateway } from "../interface/dishes.interface";
import { InjectModel } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";
import { Dish } from "../dishes.model";

@Injectable()
export class MongooseDishes implements DishesDataGateway {
    constructor(@InjectModel('dishes') private readonly dishesModel: Model<Dish>) { }

    getAllDishes = async (email: string) => {
        return this.dishesModel.find({email: email}); 
    }

    getOneDish = async (id: string) => {
        return this.dishesModel.findById(id);
    }

    createDish = async (dishe: Dish) => {
        return this.dishesModel.create(dishe);
    }

    findAndDeleteDish = async (id: string) => {
        let dishe = await this.dishesModel.findByIdAndDelete(id);
        if (!dishe) {
            throw new NotFoundException('Dishe not found');
        }
        return dishe;
    }

    saveDish = async (dishe: HydratedDocument<Dish>) => {
        return dishe.save();
    }
}