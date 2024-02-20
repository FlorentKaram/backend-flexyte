import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { DisheDto } from "./dto/dishes.dto";
import { DishesDataGateway } from "./interface/dishes.interface";

@Injectable()
export class DisheService {
    constructor(private dishesDataGateway: DishesDataGateway) { }

    async getAll(email: string) {
        return await this.dishesDataGateway.getAllDishes(email);
    }

    async getOne(id: string) {
        let dishe = await this.dishesDataGateway.getOneDishe(id);
        if (!dishe) {
            throw new NotFoundException('Dishe not found');
        }
        return dishe;
    }

    async create(email: string, dishe: DisheDto) {
        dishe.email = email;
        return this.dishesDataGateway.createDishe(dishe);
    }

    async update(email:string, id: string, dishe: DisheDto) {
        let dishetoUpdate = await this.dishesDataGateway.getOneDishe(id);
        if(dishetoUpdate.email != email){
            throw new UnauthorizedException('you cannot modify other users dishes')
        }
        if (!dishetoUpdate) {
            throw new NotFoundException('Dishe not found');
        }
        for (const [key, value] of Object.entries(dishe)) {
            if(value){
                dishetoUpdate[key] = dishe[key];
            }
        }
        return this.dishesDataGateway.saveDishe(dishetoUpdate);
    }

    async delete(email:string, id: string) {
        let dishetoDelete = await this.dishesDataGateway.getOneDishe(id);
        if(dishetoDelete.email != email){
            throw new UnauthorizedException('you cannot delete other users dishes')
        }
        if(!await this.dishesDataGateway.getOneDishe(id)){
            throw new NotFoundException('Dishe not found');
        }
        return this.dishesDataGateway.findAndDeleteDishe(id);
    }

}