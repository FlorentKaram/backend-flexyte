import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class FilterRestaurantsDto{
    @IsNumber()
    @ApiProperty()
    currentPage: number;

    @IsNumber()
    @ApiProperty()
    restaurantPerPage: number;

    @IsString()
    @ApiProperty()
    filterCompanyName: string;
}