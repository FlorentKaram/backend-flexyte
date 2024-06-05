import { Body, Controller, Delete, Get, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "src/guards/access-token.guard";
import { UpdateUserDto } from "../dto/updateUser.dto";
import { UpdatePassword } from "../dto/updatePassword.dto";
import { UsersService } from "../services/users.service";
import { FilterRestaurantsDto } from "../dto/filterRestaurants.dto";


@ApiTags('User')
@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // route to get your informations
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Get restaurant' })
    @Get()
    async findByEmail(@Request() req) {
        let user = await this.usersService.findOneByEmail(req.user.email);
        user.password = null;
        return user;
    }

    // route to get all restaurants
    @ApiOperation({ summary: 'Get all restaurants' })
    @Post('all')
    async findAllrestaurants(@Body() filter: FilterRestaurantsDto) {
        return this.usersService.findAllRestaurants(filter);
    } 

    // route to get number of restaurants
    @ApiOperation({ summary: 'Get number of restaurants' })
    @Get('count')
    async countRestaurants(){
        return this.usersService.countRestaurants();
    }

    // route to patch your informations
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Patch user' })
    @Patch()
    update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(req.user.email, req.user.companyName, updateUserDto);
    }

    // route to patch password
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Patch password' })
    @Patch('/password')
    updatePassword(@Request() req, @Body() password: UpdatePassword) {
        return this.usersService.updatePassword(req.user.email, password);
    }

    // route to delete your account
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Delete user' })
    @Delete()
    remove(@Request() req) {
        return this.usersService.remove(req.user.email);
    }
}
