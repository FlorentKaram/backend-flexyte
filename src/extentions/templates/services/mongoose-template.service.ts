import { Injectable } from "@nestjs/common";
import { TemplateDataGateway } from "../interface/templates.interface";
import { TemplateDto } from "../dto/template.dto";
import { Template } from "../templates.model";
import { HydratedDocument, Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { FilterTemplatesDto } from "../dto/filterRestaurants.dto";


@Injectable()
export class MongooseTemplate implements TemplateDataGateway{
    constructor(@InjectModel('templates') private readonly templateModel: Model<Template>) { }

    createTemplate = async (companyName: string, templateNumber: number) => {
        return this.templateModel.create({companyName: companyName, templateNumber: templateNumber, isLocked: false});
    
    };

    getAllTemplates = async (filter: FilterTemplatesDto) => {
        let perPage = 10;
        if(filter.templatePerPage != 0){
            perPage = filter.templatePerPage;
        }
        return this.templateModel
            .find({
                companyName: {
                    $regex: filter.filterCompanyName, $options: "i"
                }
            }
            )
            .limit(filter.templatePerPage)
            .skip(filter.currentPage * perPage);
    };

    countTemplates = async (companyName: string ) => {
        return this.templateModel.countDocuments({
            companyName: {
                $regex: companyName, $options: "i"
            }
        });
    }
    
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