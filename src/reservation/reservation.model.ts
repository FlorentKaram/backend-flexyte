import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export enum State {
    VALID = 'VALID',
    INVALID = 'INVALID',
    PENDING = 'PENDING'
}

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    @ApiProperty()
    @Prop({required: true})
    date : Date;
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    @Prop({required: true})
    seats: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @Prop({required: true})
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @Prop({required: true})
    phone: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    @Prop({required: true})
    email: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    @Prop()
    message: string;

    @IsOptional()
    @IsBoolean()
    @Prop({ required: true, enum: State, default: State.PENDING })
    state: State;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);