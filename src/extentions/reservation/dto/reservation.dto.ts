import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, isNotEmpty, IsNumber, IsString } from "class-validator";

export class ReservationDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    companyName: string;

    status: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    date: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    reservationPhone: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    numberOfPeople: number;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    message: string;
}