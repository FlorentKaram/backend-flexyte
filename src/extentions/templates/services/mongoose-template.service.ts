import { Injectable } from "@nestjs/common";
import { TemplateDataGateway } from "../interface/templates.interface";
import { TemplateDto } from "../dto/template.dto";
import { Template } from "../templates.model";
import { HydratedDocument, Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class MongooseTemplate implements TemplateDataGateway{
    constructor(@InjectModel('templates') private readonly templateModel: Model<Template>) { }

    createTemplate = async (email: string, templateNumber: number) => {
        return this.templateModel.create({email: email, templateNumber: templateNumber});
    
    };

    findOneTemplate = async (email: string) => {
        return this.templateModel.findOne({email: email});
    };

    updateTemplate = async (email: string, template: TemplateDto) => {
        return this.templateModel.findOneAndUpdate({email: email}, template);
    };

    saveTemplate = async (template: HydratedDocument<Template>) => {
        return template.save();
    };

    deleteTemplate = async (email: string) => {
        return this.templateModel.deleteOne({email: email});
    };
}