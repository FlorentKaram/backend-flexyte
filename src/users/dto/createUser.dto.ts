import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDefined, IsEmail, IsNotEmpty, IsString, ValidateNested } from "class-validator";

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

    @IsString()
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
    pickedTemplate: number;

    @IsString()
    @IsDefined()
    @IsArray()
    @Type(() => Date)
    @ValidateNested({ each: true })
    @ApiProperty()
    mondayFromTo: Date[];

    @IsString()
    @IsDefined()
    @IsArray()
    @Type(() => Date)
    @ValidateNested({ each: true })
    @ApiProperty()
    tuesdayFromTo: Date[];

    @IsString()
    @IsDefined()
    @IsArray()
    @Type(() => Date)
    @ValidateNested({ each: true })
    @ApiProperty()
    wednesdayFromTo: Date[];

    @IsString()
    @IsDefined()
    @IsArray()
    @Type(() => Date)
    @ValidateNested({ each: true })
    @ApiProperty()
    thursdayFromTo: Date[];

    @IsString()
    @IsDefined()
    @IsArray()
    @Type(() => Date)
    @ValidateNested({ each: true })
    @ApiProperty()
    fridayFromTo: Date[];

    @IsString()
    @IsDefined()
    @IsArray()
    @Type(() => Date)
    @ValidateNested({ each: true })
    @ApiProperty()
    saturdayFromTo: Date[];

    @IsString()
    @IsDefined()
    @IsArray()
    @Type(() => Date)
    @ValidateNested({ each: true })
    @ApiProperty()
    sundayFromTo: Date[];

    readonly isAdmin: boolean = false;
}