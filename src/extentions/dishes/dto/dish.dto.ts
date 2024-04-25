import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DishDto{
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    available: boolean;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string;
    
    createdAt: Date;    
    
    @IsNumber()
    @ApiProperty()
    price: number;

    @IsString()
    @ApiProperty()
    image: string;
    
    @IsString()
    @ApiProperty()
    category: string;
    
    @IsArray()
    @IsString({ each: true })
    @ApiProperty()
    ingredients: string[];
    
    @IsArray()
    @IsString({ each: true })
    @ApiProperty()
    allergens: string[];
    
    @IsBoolean()
    @ApiProperty()
    isAvailable: boolean;
    
    @IsBoolean()
    @ApiProperty()
    isVegan: boolean;
    
    @IsBoolean()
    @ApiProperty()
    isVegetarian: boolean;
    
    @IsBoolean()
    @ApiProperty()
    isGlutenFree: boolean;
    
    @IsBoolean()
    @ApiProperty()
    isSpicy: boolean;
}