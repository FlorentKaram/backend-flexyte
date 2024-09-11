
import { IsDefined, IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';



export class DayDto{
    @IsString()
    @ApiProperty()
    openLunchHours: string;

    @IsString()
    @ApiProperty()
    openLunchMinutes: string;

    @IsString()
    @ApiProperty()
    closeLunchHours: string;

    @IsString()
    @ApiProperty()
    closeLunchMinutes: string;

    @IsString()
    @ApiProperty()
    openDinnerHours: string;

    @IsString()
    @ApiProperty()
    openDinnerMinutes: string;

    @IsString()
    @ApiProperty()
    closeDinnerHours: string;

    @IsString()
    @ApiProperty()
    closeDinnerMinutes: string;
}

export class restaurantReservationDto{
    @Type(() => DayDto)
    @ApiProperty()
    monday: DayDto;

    @Type(() => DayDto)
    @ApiProperty()
    tuesday: DayDto;

    @Type(() => DayDto)
    @ApiProperty()
    wednesday: DayDto;

    @Type(() => DayDto)
    @ApiProperty()
    thursday: DayDto;

    @Type(() => DayDto)
    @ApiProperty()
    friday: DayDto;

    @Type(() => DayDto)
    @ApiProperty()
    saturday: DayDto;

    @Type(() => DayDto)
    @ApiProperty()
    sunday: DayDto;
}

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

    @Type(() => restaurantReservationDto)
    @ApiProperty()
    @IsNotEmpty()
    reservation: restaurantReservationDto;

}