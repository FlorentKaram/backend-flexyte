import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class BuyExtensionDto{
    
    @IsBoolean()
    @ApiProperty()
    hasCarte: boolean;

    @IsBoolean()
    @ApiProperty()
    hasReservation: boolean;

    @IsBoolean()
    @ApiProperty()
    hasClickNCollect: boolean;

    @IsBoolean()
    @ApiProperty()
    hasTeamPresentation: boolean;
}