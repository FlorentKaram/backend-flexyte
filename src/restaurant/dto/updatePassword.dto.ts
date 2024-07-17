import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UpdatePassword {
    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    @MaxLength(40)
    @IsDefined()
    @ApiProperty()
    password: string
}