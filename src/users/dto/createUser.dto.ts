import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDefined, IsEmail, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

export class CreateUserDto{
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
    state: string;

    @IsNumber()
    @IsNotEmpty()
    @IsDefined()
    @ApiProperty()
    pickedTemplate: number;

    @IsDefined()
    @IsArray()
    @Type(() => Date)
    @ValidateNested({ each: true })
    @ApiProperty()
    mondayFromTo: Date[];

    @IsDefined()
    @IsArray()
    @Type(() => Date)
    @ValidateNested({ each: true })
    @ApiProperty()
    tuesdayFromTo: Date[];

    @IsDefined()
    @IsArray()
    @Type(() => Date)
    @ValidateNested({ each: true })
    @ApiProperty()
    wednesdayFromTo: Date[];

    @IsDefined()
    @IsArray()
    @Type(() => Date)
    @ValidateNested({ each: true })
    @ApiProperty()
    thursdayFromTo: Date[];

    @IsDefined()
    @IsArray()
    @Type(() => Date)
    @ValidateNested({ each: true })
    @ApiProperty()
    fridayFromTo: Date[];

    @IsDefined()
    @IsArray()
    @Type(() => Date)
    @ValidateNested({ each: true })
    @ApiProperty()
    saturdayFromTo: Date[];

    @IsDefined()
    @IsArray()
    @Type(() => Date)
    @ValidateNested({ each: true })
    @ApiProperty()
    sundayFromTo: Date[];

    readonly isAdmin: boolean = false;
}