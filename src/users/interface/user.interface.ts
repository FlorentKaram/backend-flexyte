import { User } from "../users.model";
import { CreateUserDto } from "../dto/createUser.dto";
import { FilterRestaurantsDto } from "../dto/filterRestaurants.dto";

export abstract class UserDataGateway {
    getUserByEmail: (email: string) => Promise<User>;

    getAllRestaurants: (filter: FilterRestaurantsDto) => Promise<User[]>;

    countRestaurants: () => Promise<Number>;

    createUser: (user: CreateUserDto) => User;

    createAndSaveUser: (user: CreateUserDto) => Promise<User>;

    createFirstUser: (user: User) => Promise<User>;

    updateUser: (email: string, user: User) => Promise<User>;

    deleteUserByEmail: (email: string) => Promise<User>;

    saveUser: (userModel: User) => Promise<User>;
}