import { BadRequestException, ForbiddenException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { CreateRestaurantDto } from 'src/restaurant/dto/createRestaurant.dto';
import { RestaurantService } from 'src/restaurant/services/restaurant.service';
import { loginRestaurantDTO } from './dto/login-user.dto';

@Injectable()
export class AuthService {
    saltOrRounds = 10;
    bcrypt = require('bcryptjs');

    constructor(private restaurantService: RestaurantService, private jwtService: JwtService) {
        // init bcrypt salt
        this.bcrypt.genSaltSync(this.saltOrRounds);
    }

    async signUp(createrestaurant: CreateRestaurantDto): Promise<any> {
        const newrestaurant = await this.restaurantService.create(createrestaurant);
        const tokens = await this.getTokens(newrestaurant.email, newrestaurant.companyName, newrestaurant.isAdmin);
        return tokens;
    }

    async signIn(data: loginRestaurantDTO) {
        // Check if restaurant exists
        const restaurant = await this.restaurantService.findOneByEmail(data.email);

        if (!await this.bcrypt.compareSync(data.password, restaurant.password)) {
            throw new BadRequestException('Password is incorrect');
        }
        
        const tokens = await this.getTokens(restaurant.email, restaurant.companyName, restaurant.isAdmin);
        return tokens;
    }

    async signInAdmin(data: loginRestaurantDTO) {
        // Check if restaurant exists
        const restaurant = await this.restaurantService.findOneByEmail(data.email);

        if (!await this.bcrypt.compareSync(data.password, restaurant.password)) {
            throw new BadRequestException('Password is incorrect');
        }
        if(!restaurant.isAdmin){
            throw new UnauthorizedException();
        }
        
        const tokens = await this.getTokens(restaurant.email, restaurant.companyName, restaurant.isAdmin);
        return tokens;
    }

    hashData(data: string) {
        return this.bcrypt.hashSync(data);
    }

    async getTokens(email: string, companyName: string, isAdmin: boolean) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    email: email,
                    companyName: companyName,
                    isAdmin: isAdmin
                },
                {
                    secret: jwtConstants.secret,
                    expiresIn: '20m',
                },
            ),
            this.jwtService.signAsync(
                {
                    email: email,
                },
                {
                    secret: jwtConstants.secretRefresh,
                    expiresIn: '30d',
                },
            ),
        ]);

        return {accessToken, refreshToken};
    }

    async refreshTokens(email: string) {
        const restaurant = await this.restaurantService.findOneByEmail(email);
        if (!restaurant) {
            throw new ForbiddenException('Access Denied');
        } 
        const tokens = await this.getTokens(restaurant.email, restaurant.companyName, restaurant.isAdmin);        
        return tokens;
    }
}