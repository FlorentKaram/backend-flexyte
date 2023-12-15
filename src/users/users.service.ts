import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./users.model";
import { TemplatesService } from "src/extentions/templates/templates.service";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UpdatePassword } from "./dto/updatePassword.dto";


@Injectable()
export class UsersService {
    saltOrRounds = 10;
    bcrypt = require('bcryptjs');

    constructor(@InjectModel('users') private readonly userModel: Model<User>, private templateService: TemplatesService) {
        this.bcrypt.genSaltSync(this.saltOrRounds);
    }

    // create a new user and set his admin field to false
    async create(user: User) {
        await this.emailAlreadyExist(user.email);
        await this.nameAlreadyExist(user.companyName);
        const newUser = new this.userModel(user);

        if (newUser.password.length < 7) {
            throw new HttpException('the minimum of characters is 7', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        newUser.password = await this.bcrypt.hashSync(newUser.password, this.saltOrRounds)
        let result = await newUser.save();
        this.templateService.initUserTemplate(user.email);
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
    async update(email: string, name: string, user: UpdateUserDto) {
        if (email != user.email) {
            await this.emailAlreadyExist(user.email);
        }
        if(name != user.name){
            await this.nameAlreadyExist(user.name)
        }
        const user_update = await this.userModel.findOne({ email: email });
        if (!user_update) {
            throw new NotFoundException('User not found');
        }
        let result = await this.userModel.findOneAndUpdate({ email: email }, user);
        this.hidePassword(result);
        return result;
    }

    async updatePassword(email: string, updatePassword: UpdatePassword){
        const user = await this.userModel.findOne({ email: email });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        user.password = await this.hashData(updatePassword.password);
        await user.save();
        user.password = "";
        return user;
    }

    // methode to remove a user by his email
    async remove(email: string) {
        const user = await this.userModel.findOne({ email: email });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        let result = await this.userModel.findByIdAndDelete(user.id);
        this.templateService.deleteTemplate(email);
        this.hidePassword(result);
        return result;
    }

    // methode which create the root user if it doesn't exist
    async createFirstUser() {
        let password = await this.bcrypt.hashSync(process.env.ROOT_USER_PASSWORD || "string", this.saltOrRounds);

        this.userModel.create({
            email: process.env.ROOT_USER || "string@string.fr",
            name: "admin",
            password: password,
            isAdmin: true
        })
            .then(() => console.log("Root user has been created"))
            .catch(() => console.log("Root user already existe"));
    }

    async emailAlreadyExist(email: string) {
        const user = await this.userModel.findOne({ email: email });
        if (user) {
            throw new HttpException('User already exist', HttpStatus.CONFLICT);
        }
    }

    async nameAlreadyExist(name: string) {
        const user = await this.userModel.findOne({ name: name });
        if (user) {
            throw new HttpException('Name already exist', HttpStatus.CONFLICT);
        }
    }
    async hidePassword(user: User) {
        user.password = null;
        return user;
    }
    hashData(data: string) {
        return this.bcrypt.hashSync(data);
    }
}