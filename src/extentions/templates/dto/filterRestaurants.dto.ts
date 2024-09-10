import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class FilterTemplatesDto{
    @IsNumber()
    @ApiProperty()
    currentPage: number;

    @IsNumber()
    @ApiProperty()
    templatePerPage: number;

    @IsString()
    @ApiProperty()
    filterCompanyName: string;
}