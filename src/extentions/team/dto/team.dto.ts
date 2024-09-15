import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class TeamDto {
    @IsString()
    @ApiProperty()
    name: string

    @IsString()
    @ApiProperty()
    description: string;
    
    @IsString()
    @ApiProperty()
    image: string;
}