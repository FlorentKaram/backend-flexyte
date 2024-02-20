import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./users.model";
import { TemplatesService } from "src/extentions/templates/templates.service";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UpdatePassword } from "./dto/updatePassword.dto";
import { UserDataGateway } from "./interface/user.interface";


@Injectable()
export class UsersService {
    saltOrRounds = 10;
    bcrypt = require('bcryptjs');

    constructor(private userDataGateway: UserDataGateway, private templateService: TemplatesService) {
        this.bcrypt.genSaltSync(this.saltOrRounds);
    }

    // create new user
    async create(user: User) {
        
        // check if the email and the company name already exist
        await this.emailAlreadyExist(user.email);
        await this.nameAlreadyExist(user.companyName);
        
        // create a new user
        const newUser = this.userDataGateway.createUser(user);

        // check if the password length is greater than 7
        if (newUser.password.length < 7) {
            throw new HttpException('the minimum of characters is 7', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        // hash the password
        newUser.password = await this.bcrypt.hashSync(newUser.password, this.saltOrRounds)

        // save the user in the database
        let result = await this.userDataGateway.saveUser(newUser);

        // hide the password
        this.hidePassword(result);

        // create a template for the user
        this.templateService.initUserTemplate(user.email);

        return result;
    }


    async findOneByEmail(email: string) {
        const user = await this.userDataGateway.getUserByEmail(email);
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
        const user_update = await this.userDataGateway.getUserByEmail(email);
        if (!user_update) {
            throw new NotFoundException('User not found');
        }
        let result = await this.userDataGateway.updateUser(email, user_update);
        this.hidePassword(result);
        return result;
    }

    async updatePassword(email: string, updatePassword: UpdatePassword){
        const user = await this.userDataGateway.getUserByEmail(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        user.password = await this.hashData(updatePassword.password);
        this.userDataGateway.saveUser(user);
        user.password = "";
        return user;
    }

    // methode to remove a user by his email
    async remove(email: string) {
        const user = await this.userDataGateway.getUserByEmail(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        let result = await this.userDataGateway.getUserByEmail(email);
        this.templateService.deleteTemplate(email);
        this.hidePassword(result);
        return result;
    }

    // methode which create the root user if it doesn't exist
    async createFirstUser() {
        let password = await this.bcrypt.hashSync(process.env.ROOT_USER_PASSWORD || "string", this.saltOrRounds);

        this.userDataGateway.createAndSaveUser({
            email: process.env.ROOT_USER || "string@string.fr",
            companyName: "admin",
            companyId: 0,
            password: password,
            isAdmin: true
        })
            .then(() => console.log("Root user has been created"))
            .catch(() => console.log("Root user already existe"));
    }

    async emailAlreadyExist(email: string) {
        const user = await this.userDataGateway.getUserByEmail(email);
        if (user) {
            throw new HttpException('User already exist', HttpStatus.CONFLICT);
        }
    }

    async nameAlreadyExist(name: string) {
        const user = await this.userDataGateway.getUserByEmail(name);
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