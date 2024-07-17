import { Injectable } from "@nestjs/common";
import { TemplateDataGateway } from "../interface/templates.interface";
import { TemplateDto } from "../dto/template.dto";
import { Template } from "../templates.model";
import { HydratedDocument, Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class MongooseTemplate implements TemplateDataGateway{
    constructor(@InjectModel('templates') private readonly templateModel: Model<Template>) { }

    createTemplate = async (companyName: string, templateNumber: number) => {
        return this.templateModel.create({companyName: companyName, templateNumber: templateNumber});
    
    };

    findOneTemplate = async (companyName: string) => {
        return this.templateModel.findOne({companyName: companyName});
    };

    updateTemplate = async (companyName: string, template: TemplateDto) => {
        return this.templateModel.findOneAndUpdate({companyName: companyName}, template);
    };

    saveTemplate = async (template: HydratedDocument<Template>) => {
        return template.save();
    };

    deleteTemplate = async (companyName: string) => {
        return this.templateModel.deleteOne({companyName: companyName});
    };
}