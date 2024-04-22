import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDefined, IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto {
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

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    companyDescription: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    streetAddress1: string;

    @IsString()
    @IsDefined()
    @ApiProperty()
    streetAddress2: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    zipCode: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    pickedTemplate: number;

    @IsString()
    @IsDefined()
    @ApiProperty()
    @IsArray()
    @Type(() => Date)
    @ValidateNested({ each: true })
    mondayFromTo: Date[];

    @IsString()
    @IsDefined()
    @ApiProperty()
    @IsArray()
    @Type(() => Date)
    @ValidateNested({ each: true })
    tuesdayFromTo: Date[];

    @IsString()
    @IsDefined()
    @ApiProperty()
    @IsArray()
    @Type(() => Date)
    @ValidateNested({ each: true })
    wednesdayFromTo: Date[];

    @IsString()
    @IsDefined()
    @ApiProperty()
    @IsArray()
    @Type(() => Date)
    @ValidateNested({ each: true })
    thursdayFromTo: Date[];

    @IsString()
    @IsDefined()
    @ApiProperty()
    @IsArray()
    @Type(() => Date)
    @ValidateNested({ each: true })
    fridayFromTo: Date[];

    @IsString()
    @IsDefined()
    @ApiProperty()
    @IsArray()
    @Type(() => Date)
    @ValidateNested({ each: true })
    saturdayFromTo: Date[];

    @IsString()
    @IsDefined()
    @ApiProperty()
    @IsArray()
    @Type(() => Date)
    @ValidateNested({ each: true })
    sundayFromTo: Date[];
}