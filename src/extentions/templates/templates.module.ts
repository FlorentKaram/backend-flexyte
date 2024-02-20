
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TemplateSchema } from './templates.model';
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';
import { TemplateDataGateway } from './interface/templates.interface';
import { MongooseTemplate } from './services/mongoose-template.service';

@Module({
    imports: [MongooseModule.forFeature([{ name : "templates" , schema: TemplateSchema }])],
    providers: [TemplatesService, { provide: TemplateDataGateway, useClass: MongooseTemplate }],
    controllers: [TemplatesController],
    exports: [TemplatesService, { provide: TemplateDataGateway, useClass: MongooseTemplate }]
})
export class TemplatesModule {

}