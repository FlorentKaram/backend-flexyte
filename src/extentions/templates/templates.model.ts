import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TemplateDocument = Template & Document;

@Schema()
export class Template {

    @Prop({required: true,  default: 0})
    templateNumber: number;

    @Prop({required: true, unique: true})
    companyName: string;

    @Prop()
    description: string;

    @Prop()
    facebook: string;

    @Prop()
    instagram: string;

    @Prop()
    linkedin: string;

    @Prop()
    twitter: string;

    @Prop()
    adress: string;

    @Prop()
    postalNumber: string;

    @Prop()
    city: string;
}

export const TemplateSchema = SchemaFactory.createForClass(Template);