

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

//To use this guard add @UseGuards(AdminGuard) to your controller
@Injectable()
export class AdminGuard implements CanActivate {
    constructor() { }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return request.user.companyName == "admin";
    }
}