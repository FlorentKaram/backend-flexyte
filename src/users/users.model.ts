import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export type UserDocument = User & Document;
@Schema()
export class User {

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

    @Prop({ required: true })
    streetAddress2: string;

    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    state: string;

    @Prop({ required: true })
    zipCode: string;

    @Prop({ required: true })
    country: string;

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

export const UserSchema = SchemaFactory.createForClass(User);