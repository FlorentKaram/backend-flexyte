
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TemplateSchema } from './templates.model';
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name : "templates" , schema: TemplateSchema }])],
    providers: [TemplatesService],
    controllers: [TemplatesController],
    exports: [TemplatesService]
})
export class TemplatesModule {

}