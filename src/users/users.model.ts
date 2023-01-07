import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export type UserDocument = User & Document;

@Schema()
export class User {

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    @IsDefined()
    @Prop({ required: true, unique: true })
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @Prop()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @Prop()
    lastname: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    @MaxLength(40)
    @IsDefined()
    @ApiProperty()
    @Prop({ required: true })
    password: string;

    @Prop({ default: false })
    readonly isAdmin: boolean = false;
}

export const UserSchema = SchemaFactory.createForClass(User);