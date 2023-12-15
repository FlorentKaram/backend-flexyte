import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Dishe } from "./dishes.model";
import { DisheDto } from "./dto/dishes.dto";

@Injectable()
export class DisheService {
    constructor(@InjectModel('dishe') private readonly disheModel: Model<Dishe>) { }

    async getAll(email: string) {
        return await this.disheModel.find({email: email}); 
    }

    async getOne(id: string) {
        let dishe = await this.disheModel.findById(id);
        if (!dishe) {
            throw new NotFoundException('Dishe not found');
        }
        return dishe;
    }

    async create(email: string, dishe: DisheDto) {
        dishe.email = email;
        return this.disheModel.create(dishe);
    }

    async update(email:string, id: string, dishe: DisheDto) {
        let dishetoUpdate = await this.disheModel.findById(id);
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
        return dishetoUpdate.save();
    }

    async delete(email:string, id: string) {
        let dishetoDelete = await this.disheModel.findById(id);
        if(dishetoDelete.email != email){
            throw new UnauthorizedException('you cannot delete other users dishes')
        }
        if(!await this.disheModel.findById(id)){
            throw new NotFoundException('Dishe not found');
        }
        return this.disheModel.findByIdAndDelete(id);
    }

}