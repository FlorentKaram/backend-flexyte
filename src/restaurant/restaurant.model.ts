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

    @Prop({ default: false })
    readonly isAdmin: boolean = false;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);