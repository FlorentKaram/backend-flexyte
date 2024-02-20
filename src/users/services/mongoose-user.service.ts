import { HydratedDocument, Model } from "mongoose";
import { UserDataGateway } from "../interface/user.interface";
import { User } from "../users.model";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MongooseUser implements UserDataGateway {
    constructor(@InjectModel('users') private readonly userModel: Model<User> ) {}

    getUserByEmail = async (email: string) => {
        return this.userModel.findOne({ email: email });
    };

    createUser = (user: User) => {
        return new this.userModel(user);
    };

    createAndSaveUser = async (user: User) => {
        return this.userModel.create(user);
    };

    updateUser = async (email: string, user: User) => {
        return this.userModel.findOneAndUpdate({ email: email }, user);
    };
    
    deleteUserByEmail = async (email: string) => {
        return this.userModel.findOneAndDelete({email: email});
    };

    saveUser = async (user: HydratedDocument<User>) => {
        return user.save();
    }
    
}
