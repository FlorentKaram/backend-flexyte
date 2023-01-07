import { Body, Controller, Get, Post, Req, UseGuards, } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/users/users.model';
import { AuthService } from './auth.service';
import { loginUserDTO } from './dto/login-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RefreshTokenGuard } from '../guards/refresh-token.guard';


@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: 'Create and log user' })
    @Post('signup')
    signup(@Body() createUserDto: User) {
        return this.authService.signUp(createUserDto);
    }

    @ApiOperation({ summary: 'Login user' })
    @Post('signin')
    signin(@Body() data: loginUserDTO) {
        return this.authService.signIn(data);
    }

    @ApiOperation({ summary: 'Refresh tokens' })
    @UseGuards(RefreshTokenGuard)
    @ApiBearerAuth('acces-token')
    @Get('refresh')
    refreshTokens(@Req() req: Request) {
        return this.authService.refreshTokens(req.user['email']);
    }
}