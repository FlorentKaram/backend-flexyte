import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class reservationDto{
    @IsString()
    @ApiProperty()
    companyName: string;

    @IsBoolean()
    @ApiProperty()
    isValid: boolean;

    @IsDate()
    @ApiProperty()
    date: Date;

    @IsString()
    @ApiProperty()
    reservationPhone: string;

    @IsNumber()
    @ApiProperty()
    numberOfPeople: number;

    @IsString()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    message: string;
}