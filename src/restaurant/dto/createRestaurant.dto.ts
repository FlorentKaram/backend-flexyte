import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDefined, IsEmail, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

export class CreateRestaurantDto{
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

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    password: string;

    isAdmin: boolean = false;
}