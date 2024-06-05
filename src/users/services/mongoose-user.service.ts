import { HydratedDocument, Model } from "mongoose";
import { UserDataGateway } from "../interface/user.interface";
import { User } from "../users.model";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/createUser.dto";
import { FilterRestaurantsDto } from "../dto/filterRestaurants.dto";

@Injectable()
export class MongooseUser implements UserDataGateway {
    constructor(@InjectModel('users') private readonly userModel: Model<User>) { }

    getAllRestaurants = async (filter: FilterRestaurantsDto) => {
        return this.userModel
            .find({
                companyName: {
                    $regex: filter.filterCompanyName, $options: "i"
                }
            },
                [
                    "companyName", 
                    "email", 
                    "companyDescription", 
                    "streetAddress1",
                    "streetAddress2",
                    "zipCode",
                    "state",
                    "pickedTemplate",
                ]
            )
            .limit(filter.restaurantPerPage)
            .skip(filter.currentPage * filter.restaurantPerPage);
    };

    getUserByEmail = async (email: string) => {
        return this.userModel.findOne({ email: email });
    };

    createUser = (user: CreateUserDto) => {
        return new this.userModel(user);
    };

    createAndSaveUser = async (user: CreateUserDto) => {
        return this.userModel.create(user);
    };

    createFirstUser = async (user: User) => {
        return this.userModel.create(user);
    };

    updateUser = async (email: string, user: User) => {
        return this.userModel.findOneAndUpdate({ email: email }, user);
    };

    deleteUserByEmail = async (email: string) => {
        return this.userModel.findOneAndDelete({ email: email });
    };

    saveUser = async (user: HydratedDocument<User>) => {
        return user.save();
    }

}
