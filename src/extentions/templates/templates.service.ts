import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { TemplateDto } from "./dto/template.dto";
import { TemplateDataGateway } from "./interface/templates.interface";


@Injectable()
export class TemplatesService {

    constructor(private templateDataGateway: TemplateDataGateway) { }

    // create a new template
    async initUserTemplate(email: string) {
        return this.templateDataGateway.createTemplate(email, 0);
    }

    async updateTemplate(email: string, template: TemplateDto) {
        let temp = await this.templateDataGateway.findOneTemplate(email);

        for (const [key, value] of Object.entries(template)) {
            if(value){
                temp[key] = template[key];
            }
        }

        return this.templateDataGateway.saveTemplate(temp);
    }

    async getTemplate(email: string){
        let temp = await this.templateDataGateway.findOneTemplate(email);
        if(!temp){
            throw new NotFoundException();
        }
        return temp;
    }
}