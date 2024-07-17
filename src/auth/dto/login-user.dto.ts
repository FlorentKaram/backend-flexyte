
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class loginRestaurantDTO {

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    @IsDefined()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @ApiProperty()
    @IsDefined()
    @IsString()
    @ApiProperty()
    password: string;
}