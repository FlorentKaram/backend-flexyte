import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class BuyExtensionDto{
    
    @IsBoolean()
    hasCarte: boolean;

    @IsBoolean()
    hasReservation: boolean;

    @IsBoolean()
    hasClickNCollect: boolean;

    @IsBoolean()
    hasTeamPresentation: boolean;
}