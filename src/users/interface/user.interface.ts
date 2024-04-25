import { User } from "../users.model";
import { CreateUserDto } from "../dto/createUser.dto";

export abstract class UserDataGateway {
    getUserByEmail: (email: string) => Promise<User>;

    createUser: (user: CreateUserDto) => User;

    createAndSaveUser: (user: CreateUserDto) => Promise<User>;

    createFirstUser: (user: User) => Promise<User>;

    updateUser: (email: string, user: User) => Promise<User>;

    deleteUserByEmail: (email: string) => Promise<User>;

    saveUser: (userModel: User) => Promise<User>;
}