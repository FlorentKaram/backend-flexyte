import { FilterTemplatesDto } from "../dto/filterRestaurants.dto";
import { TemplateDto } from "../dto/template.dto";
import { Template } from "../templates.model";


export abstract class TemplateDataGateway {
    createTemplate: (companyName: string, templateNumber: number) => Promise<Template>;

    findOneTemplate: (companyName: string) => Promise<Template>;

    updateTemplate: (companyName: string, template: Template) => Promise<Template>;

    saveTemplate: (template: Template) => Promise<Template>;

    deleteTemplate: (companyName: string) => Promise<any>;

    countTemplates: (companyName: string) => Promise<number>;

    getAllTemplates: (filterTemplatesDto: FilterTemplatesDto) => Promise<any>;
}