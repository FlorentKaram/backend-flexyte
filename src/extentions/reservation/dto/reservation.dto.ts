import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class ReservationDto{
    @IsString()
    @ApiProperty()
    companyName: string;

    isValid: boolean;

    @IsString()
    @ApiProperty()
    date: string;

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