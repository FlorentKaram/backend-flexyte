import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { TemplateDto } from "./dto/template.dto";
import { TemplateDataGateway } from "./interface/templates.interface";
import { FilterTemplatesDto } from "./dto/filterRestaurants.dto";
import { log } from "console";


@Injectable()
export class TemplatesService {

    constructor(private templateDataGateway: TemplateDataGateway) { }

    // create a new template
    async initRestaurantTemplate(companyName: string) {
        return this.templateDataGateway.createTemplate(companyName, 0);
    }

    async updateTemplate(companyName: string, template: TemplateDto) {        
        let temp = await this.templateDataGateway.findOneTemplate(companyName);
        if(!temp){
            throw new HttpException("An error occurred, try later", HttpStatus.NOT_FOUND)
        }
        for (const [key, value] of Object.entries(template)) {
            if(value){
                temp[key] = template[key];
            }
        }
        
        return this.templateDataGateway.saveTemplate(temp);
    }

    async lockTemplate(companyName: string){
        let temp = await this.templateDataGateway.findOneTemplate(companyName);
        if(!temp){
            throw new NotFoundException();
        }
        temp.isLocked = !temp.isLocked;
        await this.templateDataGateway.updateTemplate(temp.companyName,temp);
        return true;
    }

    async getTemplate(companyName: string){
        let temp = await this.templateDataGateway.findOneTemplate(companyName);
        if(!temp){
            throw new NotFoundException();
        }
        return temp;
    }

    async getAllTemplates(filterTemplatesDto: FilterTemplatesDto){
        let templates = await this.templateDataGateway.getAllTemplates(filterTemplatesDto);
        let numberOfTemplates = await this.templateDataGateway.countTemplates(filterTemplatesDto.filterCompanyName);
        let perPage = filterTemplatesDto.templatePerPage;
        if(filterTemplatesDto.templatePerPage == 0){
            perPage = 10;
        }
        return {
            templates: templates,
            numberOfTemplates: numberOfTemplates,
            page: filterTemplatesDto.currentPage,
            perPage: perPage
        }
    }

    async buyExtension(companyName: string, buyExtensionDto){
        let temp = await this.templateDataGateway.findOneTemplate(companyName);
        if(!temp){
            throw new NotFoundException();
        }
        temp.hasCarte = buyExtensionDto.hasCarte;
        temp.hasTeamPresentation = buyExtensionDto.hasTeamPresentation;
        temp.hasReservation = buyExtensionDto.hasReservation;
        temp.hasClickNCollect = buyExtensionDto.hasClickNCollect;
        return this.templateDataGateway.saveTemplate(temp);
    }
}