import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDefined, IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRestaurantDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    companyName: string;

    @IsNumber()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    companyId: number;
}