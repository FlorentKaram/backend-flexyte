import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export type RestaurantDocument = Restaurant & Document;
@Schema()
export class Restaurant {

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, unique: true })
    companyName: string;

    @Prop({ required: true })
    companyId: number;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    streetAddress1: string;

    @Prop()
    streetAddress2: string;

    @Prop({ required: true })
    state: string;

    @Prop({ required: true })
    zipCode: string;

    @Prop({ required: true })
    pickedTemplate: number;

    @Prop({ required: true })
    mondayFromTo: Date[];

    @Prop({ required: true })
    tuesdayFromTo: Date[];

    @Prop({ required: true })
    wednesdayFromTo: Date[];

    @Prop({ required: true })
    thursdayFromTo: Date[];

    @Prop({ required: true })
    fridayFromTo: Date[];

    @Prop({ required: true })
    saturdayFromTo: Date[];

    @Prop({ required: true })
    sundayFromTo: Date[];

    @Prop({ default: false })
    readonly isAdmin: boolean = false;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);