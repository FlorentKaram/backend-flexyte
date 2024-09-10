import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Restaurant } from "../restaurant.model";
import { TemplatesService } from "src/extentions/templates/templates.service";
import { UpdatePassword } from "../dto/updatePassword.dto";
import { TemplateDataGateway } from "src/extentions/templates/interface/templates.interface";
import { SirenDataGateway } from "../interface/siren.interface";
import { RestaurantDataGateway } from "../interface/restaurant.interface";
import { CreateRestaurantDto } from "../dto/createRestaurant.dto";
import { UpdateRestaurantDto } from "../dto/updateRestaurant.dto";


@Injectable()
export class RestaurantService {
    saltOrRounds = 10;
    bcrypt = require('bcryptjs');

    constructor(
        private restaurantDataGateway: RestaurantDataGateway,
        private templateDataGateway: TemplateDataGateway,
        private templateService: TemplatesService,
        private sirenDataGateway: SirenDataGateway
    ) {
        this.bcrypt.genSaltSync(this.saltOrRounds);
    }

    // create new restaurant
    async create(restaurant: CreateRestaurantDto) {
        if(!restaurant.isAdmin){
            let isSirenValid = await this.sirenDataGateway.checkSiren(restaurant.companyId);
            if (!isSirenValid) {
                throw new HttpException('Invalid siren', HttpStatus.NOT_FOUND);
            }
        }

        // check if the email and the company name already exist
        await this.emailAlreadyExist(restaurant.email);
        await this.nameAlreadyExist(restaurant.companyName);

        // create a new restaurant
        const newRestaurant = this.restaurantDataGateway.createRestaurant(restaurant);

        // check if the password length is greater than 7
        if (newRestaurant.password.length < 7) {
            throw new HttpException('the minimum of characters is 7 for your password', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        // hash the password
        newRestaurant.password = await this.bcrypt.hashSync(newRestaurant.password, this.saltOrRounds)

        // save the restaurant in the database
        let result = await this.restaurantDataGateway.saveRestaurant(newRestaurant);

        // hide the password
        this.hidePassword(result);

        if (!newRestaurant.isAdmin) {
            // create a template for the restaurant
            this.templateService.initRestaurantTemplate(restaurant.companyName);
        }

        return result;
    }


    async findOneByEmail(email: string) {
        const restaurant = await this.restaurantDataGateway.getRestaurantByEmail(email);
        if (!restaurant) {
            throw new NotFoundException('Restaurant not found');
        }
        return restaurant;
    }

    // methode to update a restaurant
    async update(email: string, companyName: string, restaurant: UpdateRestaurantDto) {
        if (email != restaurant.email) {
            await this.emailAlreadyExist(restaurant.email);
        }
        if (companyName != restaurant.companyName) {
            await this.nameAlreadyExist(restaurant.companyName)
        }
        const restaurant_update = await this.restaurantDataGateway.getRestaurantByEmail(email);
        if (!restaurant_update) {
            throw new NotFoundException('Restaurant not found');
        }
        let result = await this.restaurantDataGateway.updateRestaurant(email, restaurant_update);
        this.hidePassword(result);
        return result;
    }

    async updatePassword(email: string, updatePassword: UpdatePassword) {
        const restaurant = await this.restaurantDataGateway.getRestaurantByEmail(email);
        if (!restaurant) {
            throw new NotFoundException('Restaurant not found');
        }
        restaurant.password = await this.hashData(updatePassword.password);
        this.restaurantDataGateway.saveRestaurant(restaurant);
        restaurant.password = "";
        return restaurant;
    }

    // methode to remove a restaurant by his email
    async remove(companyName: string) {
        const restaurant = await this.restaurantDataGateway.getRestaurantByCompanyName(companyName);
        if (!restaurant) {
            throw new NotFoundException('Restaurant not found');
        }
        let result = await this.restaurantDataGateway.deleteRestaurantByEmail(restaurant.email);
        await this.templateDataGateway.deleteTemplate(companyName);
        this.hidePassword(result);
        return result;
    }

    // methode which create the root restaurant if it doesn't exist
    async createFirstRestaurant() {
        let password = await this.bcrypt.hashSync(process.env.ROOT_USER_PASSWORD || "string", this.saltOrRounds);
        let res = await this.restaurantDataGateway.createFirstRestaurant({
            email: process.env.ROOT_USER || "admin@admin.fr",
            companyName: "admin",
            companyId: 0,
            password: password,
            isAdmin: true
        }).then(() => console.log("Root restaurant has been created"))
            .catch(() => console.log("Root restaurant already existe"));
    }

    async emailAlreadyExist(email: string) {
        const restaurant = await this.restaurantDataGateway.getRestaurantByEmail(email);
        if (restaurant) {
            throw new HttpException('Restaurant already exist', HttpStatus.CONFLICT);
        }
    }

    async nameAlreadyExist(name: string) {
        const restaurant = await this.restaurantDataGateway.getRestaurantByEmail(name);
        if (restaurant) {
            throw new HttpException('Company name already exist', HttpStatus.CONFLICT);
        }
    }

    async hidePassword(restaurant: Restaurant) {
        restaurant.password = null;
        return restaurant;
    }
    hashData(data: string) {
        return this.bcrypt.hashSync(data);
    }
}