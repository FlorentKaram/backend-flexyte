import { Injectable } from "@nestjs/common";
import { TemplateDataGateway } from "../interface/templates.interface";
import { TemplateDto } from "../dto/template.dto";
import { RestaurantReservation, Template } from "../templates.model";
import { HydratedDocument, Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { FilterTemplatesDto } from "../dto/filterRestaurants.dto";
import { Reservation } from "src/extentions/reservation/reservation.model";


@Injectable()
export class MongooseTemplate implements TemplateDataGateway{
    constructor(@InjectModel('templates') private readonly templateModel: Model<Template>) { }

    createTemplate = async (companyName: string, templateNumber: number) => {
        let reservation: RestaurantReservation = {
            monday: {
                openLunchHours: "",
                openLunchMinutes: "",
                closeLunchHours: "",
                closeLunchMinutes: "",
                openDinnerHours: "",
                openDinnerMinutes: "",
                closeDinnerHours: "",
                closeDinnerMinutes: ""
            },
            tuesday: {
                openLunchHours: "",
                openLunchMinutes: "",
                closeLunchHours: "",
                closeLunchMinutes: "",
                openDinnerHours: "",
                openDinnerMinutes: "",
                closeDinnerHours: "",
                closeDinnerMinutes: ""
            },
            wednesday: {
                openLunchHours: "",
                openLunchMinutes: "",
                closeLunchHours: "",
                closeLunchMinutes: "",
                openDinnerHours: "",
                openDinnerMinutes: "",
                closeDinnerHours: "",
                closeDinnerMinutes: ""
            },
            thursday: {
                openLunchHours: "",
                openLunchMinutes: "",
                closeLunchHours: "",
                closeLunchMinutes: "",
                openDinnerHours: "",
                openDinnerMinutes: "",
                closeDinnerHours: "",
                closeDinnerMinutes: ""
            },
            friday: {
                openLunchHours: "",
                openLunchMinutes: "",
                closeLunchHours: "",
                closeLunchMinutes: "",
                openDinnerHours: "",
                openDinnerMinutes: "",
                closeDinnerHours: "",
                closeDinnerMinutes: ""
            },
            saturday: {
                openLunchHours: "",
                openLunchMinutes: "",
                closeLunchHours: "",
                closeLunchMinutes: "",
                openDinnerHours: "",
                openDinnerMinutes: "",
                closeDinnerHours: "",
                closeDinnerMinutes: ""
            },
            sunday: {
                openLunchHours: "",
                openLunchMinutes: "",
                closeLunchHours: "",
                closeLunchMinutes: "",
                openDinnerHours: "",
                openDinnerMinutes: "",
                closeDinnerHours: "",
                closeDinnerMinutes: ""
            }
        }
        return this.templateModel.create({companyName: companyName, templateNumber: templateNumber, reservation: reservation ,isLocked: false});
    
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

    updateTemplate = async (companyName: string, template: Template) => {
        return this.templateModel.findOneAndUpdate({companyName: companyName}, template);
    };

    saveTemplate = async (template: HydratedDocument<Template>) => {
        return template.save();
    };

    deleteTemplate = async (companyName: string) => {
        return this.templateModel.deleteOne({companyName: companyName});
    };

}