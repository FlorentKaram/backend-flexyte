
import { IsDefined, IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class TemplateDto{

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    templateNumber: number;

    @IsString()
    @ApiProperty()
    description: string;

    @IsString()
    @ApiProperty()
    facebook: string;

    @IsString()
    @ApiProperty()
    instagram: string;

    @IsString()
    @ApiProperty()
    linkedin: string;

    @IsString()
    @ApiProperty()
    twitter: string;

    @IsString()
    @ApiProperty()
    adress: string;

    @IsString()
    @ApiProperty()
    postalNumber: string;

    @IsString()
    @ApiProperty()
    city: string;

}