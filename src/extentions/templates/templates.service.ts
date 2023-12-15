import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Template } from "./templates.model";
import { TemplateDto } from "./dto/template.dto";


@Injectable()
export class TemplatesService {

    constructor(@InjectModel('templates') private readonly templateModel: Model<Template>) { }

    // create a new template
    async initUserTemplate(email: string) {
        return this.templateModel.create({email: email, templateNumber: 0});
    }

    async updateTemplate(email: string, template: TemplateDto) {
        let temp = await this.templateModel.findOne({email: email});

        for (const [key, value] of Object.entries(template)) {
            if(value){
                temp[key] = template[key];
            }
        }

        return temp.save();
    }

    async getTemplate(email: string){
        let temp = await this.templateModel.findOne({email: email});
        if(!temp){
            throw new NotFoundException();
        }

        return temp;
    }

    async deleteTemplate(email: string){
        const template = await this.templateModel.deleteOne({email: email});
        return template;
    }
}