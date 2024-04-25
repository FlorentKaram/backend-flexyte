import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { DishesDataGateway } from "./interface/dishes.interface";
import { DishDto } from "./dto/dish.dto";

@Injectable()
export class DishService {
    constructor(private dishesDataGateway: DishesDataGateway) { }

    async getAll(email: string) {
        return await this.dishesDataGateway.getAllDishes(email);
    }

    async getOne(id: string) {
        let dish = await this.dishesDataGateway.getOneDish(id);
        if (!dish) {
            throw new NotFoundException('Dishe not found');
        }
        return dish;
    }

    async create(email: string, dish: DishDto) {
        dish.email = email;
        return this.dishesDataGateway.createDish(dish);
    }

    async update(email:string, id: string, dish: DishDto) {
        let dishtoUpdate = await this.dishesDataGateway.getOneDish(id);
        if(dishtoUpdate.email != email){
            throw new UnauthorizedException('you cannot modify other users dishes')
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

    async delete(email:string, id: string) {
        let dishtoDelete = await this.dishesDataGateway.getOneDish(id);
        if(dishtoDelete.email != email){
            throw new UnauthorizedException('you cannot delete other users dishes')
        }
        if(!await this.dishesDataGateway.getOneDish(id)){
            throw new NotFoundException('Dish not found');
        }
        return this.dishesDataGateway.findAndDeleteDish(id);
    }

}