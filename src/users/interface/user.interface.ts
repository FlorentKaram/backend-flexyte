import { Model } from "mongoose";
import { User } from "../users.model";

export abstract class UserDataGateway {
    getUserByEmail: (email: string) => Promise<User>;

    createUser: (user: User) => User;

    createAndSaveUser: (user: User) => Promise<User>;

    updateUser: (email: string, user: User) => Promise<User>;

    deleteUserById: (id: string) => Promise<User>;

    saveUser: (userModel: User) => Promise<User>;
}