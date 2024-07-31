import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { TemplateDto } from "./dto/template.dto";
import { TemplateDataGateway } from "./interface/templates.interface";
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
        return true;
    }

    async getTemplate(companyName: string){
        let temp = await this.templateDataGateway.findOneTemplate(companyName);
        if(!temp){
            throw new NotFoundException();
        }
        return temp;
    }
}