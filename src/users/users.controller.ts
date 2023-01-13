import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { User } from "./users.model";
import { UsersService } from "./users.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "src/guards/access-token.guard";

@ApiTags('User API')
@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // route to get your informations
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Get user with bearer token' })
    @Get()
    async findByEmail(@Request() req) {
        let user = await this.usersService.findOneByEmail(req.user.email);
        user.password = null;
        return user;
    }

    // route to patch your informations
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Patch user with bearer token' })
    @Patch()
    update(@Request() req, @Body() updateUserDto: User) {
        return this.usersService.update(req.user.email, updateUserDto);
    }

    // route to delete your account
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Delete user with bearer token' })
    @Delete()
    remove(@Request() req) {
        return this.usersService.remove(req.user.email);
    }
}
