import { Dish } from "../dishes.model";

export abstract class DishesDataGateway {

    getAllDishes: (companyName: string) => Promise<Dish[]>;

    getOneDish: (id: string)=> Promise<Dish>;

    createDish:(dish: Dish)=> Promise<Dish>;

    findAndDeleteDish:(id: string)=> Promise<Dish>;
    
    saveDish:(dish: Dish)=> Promise<Dish>;

}