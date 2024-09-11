import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/guards/access-token.guard';
import { UpdatePassword } from '../dto/updatePassword.dto';
import { RestaurantService } from '../services/restaurant.service';
import { UpdateRestaurantDto } from '../dto/updateRestaurant.dto';

@ApiTags('Restaurant')
@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantsService: RestaurantService) {}

  // route to get your informations
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('acces-token')
  @ApiOperation({ summary: 'Get restaurant' })
  @Get()
  async findByEmail(@Request() req) {
    const user = await this.restaurantsService.findOneByEmail(req.user.email);
    user.password = null;
    return user;
  }

  // No need to be logged in to get all restaurants
  @ApiOperation({ summary: 'Get all restaurants' })
  @Get('all')
  async findAll() {
    return this.restaurantsService.findAll();
  }

  // route to patch your informations
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('acces-token')
  @ApiOperation({ summary: 'Patch restaurant' })
  @Patch()
  update(@Request() req, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantsService.update(
      req.user.email,
      req.user.companyName,
      updateRestaurantDto,
    );
  }

  // route to patch password
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('acces-token')
  @ApiOperation({ summary: 'Patch password' })
  @Patch('/password')
  updatePassword(@Request() req, @Body() password: UpdatePassword) {
    return this.restaurantsService.updatePassword(req.user.email, password);
  }

  // route to delete your account
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('acces-token')
  @ApiOperation({ summary: 'Delete restaurant' })
  @Delete()
  remove(@Request() req) {
    return this.restaurantsService.remove(req.user.companyName);
  }
}
