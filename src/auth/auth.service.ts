import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.model';
import { loginUserDTO } from './dto/login-user.dto';
import { jwtConstants } from './constant';

@Injectable()
export class AuthService {
    saltOrRounds = 10;
    bcrypt = require('bcryptjs');

    constructor(private usersService: UsersService, private jwtService: JwtService) {
        // init bcrypt salt
        this.bcrypt.genSaltSync(this.saltOrRounds);
    }

    async signUp(createUser: User): Promise<any> {
        const newUser = await this.usersService.create(createUser);
        const tokens = await this.getTokens(newUser.email, newUser.companyName);
        return tokens;
    }

    async signIn(data: loginUserDTO) {
        // Check if user exists
        const user = await this.usersService.findOneByEmail(data.email);

        if (!await this.bcrypt.compareSync(data.password, user.password)) {
            throw new BadRequestException('Password is incorrect');
        }

        const tokens = await this.getTokens(user.email, user.companyName);
        return tokens;
    }

    hashData(data: string) {
        return this.bcrypt.hashSync(data);
    }

    async getTokens(email: string, name: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    email: email,
                    companyName: name,
                },
                {
                    secret: jwtConstants.secret,
                    expiresIn: '20m',
                },
            ),
            this.jwtService.signAsync(
                {
                    email: email,
                    companyName: name,
                },
                {
                    secret: jwtConstants.secret,
                    expiresIn: '60d',
                },
            ),
        ]);

        return {accessToken, refreshToken};
    }

    async refreshTokens(email: string) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new ForbiddenException('Access Denied');
        } 
        const tokens = await this.getTokens(user.email, user.companyName);        
        return tokens;
    }
}