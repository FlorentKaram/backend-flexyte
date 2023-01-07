import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./users.model";


@Injectable()
export class UsersService {
    saltOrRounds = 10;
    bcrypt = require('bcryptjs');

    constructor(@InjectModel('users') private readonly userModel: Model<User>) {
        this.bcrypt.genSaltSync(this.saltOrRounds);
    }

    // create a new user and set his admin field to false
    async create(user: User) {
        await this.userAlreadyExist(user.email);
        const newUser = new this.userModel(user);
        
        if (newUser.password.length < 7) {
            throw new HttpException('the minimum of characters is 7', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        newUser.password = await this.bcrypt.hashSync(newUser.password, this.saltOrRounds)        
        let result = await newUser.save();
        this.hidePassword(result);
        return result;
    }

    // methode which return a user by his email
    async findOneByEmail(email: string) {
        const user = await this.userModel.findOne({ email: email });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    // methode to update a user
    async update(email: string, user: User) {
        if(email != user.email){
            await this.userAlreadyExist(user.email);
        }
        if (user.password && user.password.length < 7) {
            throw new HttpException('the minimum of characters is 7', HttpStatus.BAD_REQUEST);
        }
        const user_update = await this.userModel.findOne({ email: email });
        if (!user_update) {
            throw new NotFoundException('User not found');
        }
        if (user.password){
            user.password = await this.bcrypt.hashSync(user.password, this.saltOrRounds);
        }
        let result = await this.userModel.findOneAndUpdate({ email: email }, user);
        this.hidePassword(result);
        return result;
    }


    // methode to remove a user by his email
    async remove(email: string) {
        const user = await this.userModel.findOne({ email: email });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        let result = await this.userModel.findByIdAndDelete(user.id);
        this.hidePassword(result);
        return result;
    }

    // methode which create the root user if it doesn't exist
    async createFirstUser() {
        let password = await this.bcrypt.hashSync(process.env.ROOT_USER_PASSWORD || "string", this.saltOrRounds);

        this.userModel.create({
            email: process.env.ROOT_USER || "string@aze.fr",
            firstname: "firstname",
            lastname: "lastemail",
            password: password,
            isAdmin: true
        })
            .then(() => console.log("Root user has been created"))
            .catch(() => console.log("Root user already existe" ));
    }

    // methode who return a user by his email and throw an error is user is not found 
    async userAlreadyExist(email: string) {
        const user = await this.userModel.findOne({ email: email });
        if (user) {
            throw new HttpException('User already exist', HttpStatus.CONFLICT);
        }
    }

    async hidePassword(user: User) {
        user.password = null;
        return user;
    }
}