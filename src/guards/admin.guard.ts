import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { jwtDecode } from 'jwt-decode';
import { ExtractJwt } from 'passport-jwt';
import { Observable } from 'rxjs';

//To use this guard add @UseGuards(AdminGuard) to your controller
@Injectable()
export class AdminGuard implements CanActivate {
    constructor() { }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request)
        const decodedHeader: any = jwtDecode(token);
        return decodedHeader.isAdmin;
    }
}