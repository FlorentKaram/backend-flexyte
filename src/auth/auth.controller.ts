import { Body, Controller, Get, Post, Req, UseGuards, } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RefreshTokenGuard } from '../guards/refresh-token.guard';
import { AccessTokenGuard } from 'src/guards/access-token.guard';
import { CreateRestaurantDto } from 'src/restaurant/dto/createRestaurant.dto';
import { loginRestaurantDTO } from './dto/login-user.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { RootAdminGuard } from 'src/guards/root-admin.guard';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: 'Create account and login' })
    @Post('signup')
    signup(@Body() createRestaurantDto: CreateRestaurantDto) {
        return this.authService.signUp(createRestaurantDto);
    }

    @UseGuards(RootAdminGuard)
    @ApiOperation({ summary: 'Create admin' })
    @Post('signup')
    signupAdmin(@Body() createRestaurantDto: CreateRestaurantDto) {
        createRestaurantDto.isAdmin = true;
        return this.authService.signUp(createRestaurantDto);
    }

    @ApiOperation({ summary: 'Login' })
    @Post('signin')
    signin(@Body() data: loginRestaurantDTO) {
        return this.authService.signIn(data);
    }

    @ApiOperation({ summary: 'Refresh token' })
    @UseGuards(RefreshTokenGuard)
    @ApiBearerAuth('acces-token')
    @Get('refresh')
    refreshTokens(@Req() req: Request) {
        return this.authService.refreshTokens(req.user['email']);
    }

    @ApiOperation({ summary: 'Check token' })
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @Get('check')
    checkToken() {
        return {
            code: 200,
            message: "Ok"
        }
    }

    @ApiOperation({ summary: 'Check if it\'s an admin token' })
    @UseGuards(AdminGuard)
    @ApiBearerAuth('acces-token')
    @Get('check/admin')
    checkTokenAdmin() {
        return {
            code: 200,
            message: "Ok"
        }
    }

    @ApiOperation({ summary: 'Check if it\'s a root admin token' })
    @UseGuards(RootAdminGuard)
    @ApiBearerAuth('acces-token')
    @Get('check/admin/root')
    checkTokenRootAdmin() {
        return {
            code: 200,
            message: "Ok"
        }
    }  

}