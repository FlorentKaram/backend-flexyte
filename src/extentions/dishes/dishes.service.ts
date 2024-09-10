import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { DishesDataGateway } from "./interface/dishes.interface";
import { DishDto } from "./dto/dish.dto";

@Injectable()
export class DishService {
    constructor(private dishesDataGateway: DishesDataGateway) { }

    async getOne(id: string) {
        let dish = await this.dishesDataGateway.getOneDish(id);
        if (!dish) {
            throw new NotFoundException('Dish not found');
        }
        return dish;
    }

    async getAll(companyName: string) {
        return await this.dishesDataGateway.getAllDishes(companyName);
    }

    async create(companyName: string, dish: DishDto) {
        dish.companyName = companyName;
        return this.dishesDataGateway.createDish(dish);
    }

    async update(companyName: string, id: string, dish: DishDto) {
        let dishtoUpdate = await this.dishesDataGateway.getOneDish(id);
        if(dishtoUpdate.companyName != companyName){
            throw new UnauthorizedException('you cannot modify other restaurants dishes')
        }
        if (!dishtoUpdate) {
            throw new NotFoundException('Dish not found');
        }
        for (const [key, value] of Object.entries(dish)) {
            if(value){
                dishtoUpdate[key] = dish[key];
            }
        }
        return this.dishesDataGateway.saveDish(dishtoUpdate);
    }

    async delete(companyName: string, id: string) {
        let dishtoDelete = await this.dishesDataGateway.getOneDish(id);
        if(dishtoDelete.companyName != companyName){
            throw new UnauthorizedException('you cannot delete other restaurants dishes')
        }
        if(!await this.dishesDataGateway.getOneDish(id)){
            throw new NotFoundException('Dish not found');
        }
        return this.dishesDataGateway.findAndDeleteDish(id);
    }

    async deleteAllDish(companyName: string){
        return this.dishesDataGateway.deleteAllDish(companyName);
    }

}