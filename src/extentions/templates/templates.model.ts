import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TemplateDocument = Template & Document;

@Schema({ _id: false, safe: false })
export class Day {
    @Prop()
    openLunchHours: string;

    @Prop()
    openLunchMinutes: string;

    @Prop()
    closeLunchHours: string;

    @Prop()
    closeLunchMinutes: string;

    @Prop()
    openDinnerHours: string;

    @Prop()
    openDinnerMinutes: string;

    @Prop()
    closeDinnerHours: string;

    @Prop()
    closeDinnerMinutes: string;
}
@Schema({ _id: false, safe: false })
export class RestaurantReservation {
    @Prop({ type: Day })
    monday: Day;

    @Prop({ type: Day })
    tuesday: Day;

    @Prop({ type: Day })
    wednesday: Day;

    @Prop({ type: Day })
    thursday: Day;

    @Prop({ type: Day })
    friday: Day;

    @Prop({ type: Day })
    saturday: Day;

    @Prop({ type: Day })
    sunday: Day;
}

@Schema()
export class Template {

    @Prop({ required: true, default: 0 })
    templateNumber: number;

    @Prop({ required: true, unique: true })
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

    @Prop()
    hasCarte: boolean;

    @Prop()
    hasReservation: boolean;

    @Prop()
    hasClickNCollect: boolean;

    @Prop()
    image: string;

    @Prop()
    hasTeamPresentation: boolean;

    @Prop({ type: RestaurantReservation })
    reservation: RestaurantReservation;

    @Prop({ default: false })
    isLocked: boolean = false;
}


export const TemplateSchema = SchemaFactory.createForClass(Template);