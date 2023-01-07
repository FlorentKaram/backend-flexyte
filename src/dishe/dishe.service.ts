import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Dishe } from "./dishe.model";


@Injectable()
export class DisheService {
    constructor(@InjectModel('dishe') private readonly disheModel: Model<Dishe>) { }

    async getAll() {
        return this.disheModel.find();
    }

    async getOne(id: string) {
        let dishe = await this.disheModel.findById(id);
        if (!dishe) {
            throw new NotFoundException('Dishe not found');
        }
        return dishe;
    }

    async create(dishe: Dishe) {
        return this.disheModel.create(dishe);
    }

    async update(id: string, dishe: Dishe) {
        let dishetoUpdate = await this.disheModel.findById(id);
        if (!dishetoUpdate) {
            throw new NotFoundException('Dishe not found');
        }
        dishetoUpdate.update(dishe);
        return dishetoUpdate.save();
    }

    async delete(id: string) {
        if(!await this.disheModel.findById(id)){
            throw new NotFoundException('Dishe not found');
        }
        return this.disheModel.findByIdAndDelete(id);
    }
}