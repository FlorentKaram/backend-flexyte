import { Dishe } from "../dishes.model";

export abstract class DishesDataGateway {

    getAllDishes: (email: string) => Promise<Dishe[]>;

    getOneDishe: (id: string)=> Promise<Dishe>;

    createDishe:(dishe: Dishe)=> Promise<Dishe>;

    findAndDeleteDishe:(id: string)=> Promise<Dishe>;
    
    saveDishe:(dishe: Dishe)=> Promise<Dishe>;

}