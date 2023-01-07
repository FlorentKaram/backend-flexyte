import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { User } from 'src/users/users.model';

//To use this guard add @UseGuards(AccessTokenGuard, AdminGuard) to your controller
@Injectable()
export class AdminGuard implements CanActivate {
    constructor(@InjectModel('users') private readonly userModel: Model<User>) { }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.isAdmin(request.user.email);
    }
    // methode who return true if the user link to the token is an admin
    async isAdmin(email: string) : Promise<boolean> {
        const user = await this.userModel.findOne({ email: email });        
        if (!user || !user.isAdmin) {
            return false;
        }
        return true;
    }
}