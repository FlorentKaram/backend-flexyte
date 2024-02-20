import { Injectable, NotFoundException } from "@nestjs/common";
import { DishesDataGateway } from "../interface/dishes.interface";
import { InjectModel } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";
import { Dishe } from "../dishes.model";

@Injectable()
export class MongooseDishes implements DishesDataGateway {
    constructor(@InjectModel('dishes') private readonly dishesModel: Model<Dishe>) { }

    getAllDishes = async (email: string) => {
        return this.dishesModel.find({email: email}); 
    }

    getOneDishe = async (id: string) => {
        return this.dishesModel.findById(id);
    }

    createDishe = async (dishe: Dishe) => {
        return this.dishesModel.create(dishe);
    }

    findAndDeleteDishe = async (id: string) => {
        let dishe = await this.dishesModel.findByIdAndDelete(id);
        if (!dishe) {
            throw new NotFoundException('Dishe not found');
        }
        return dishe;
    }

    saveDishe = async (dishe: HydratedDocument<Dishe>) => {
        return dishe.save();
    }
}