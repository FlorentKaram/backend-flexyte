import { TemplateDto } from "../dto/template.dto";
import { Template } from "../templates.model";


export abstract class TemplateDataGateway {
    createTemplate: (email: string, templateNumber: number) => Promise<Template>;

    findOneTemplate: (email: string) => Promise<Template>;

    updateTemplate: (email: string, template: TemplateDto) => Promise<Template>;

    saveTemplate: (template: Template) => Promise<Template>;

    deleteTemplate: (email: string) => Promise<any>;
}