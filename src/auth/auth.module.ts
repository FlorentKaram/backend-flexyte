import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from "@nestjs/jwt";
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constant';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '15m' },
    }),
    UsersModule
  ],
  providers: [AuthService,AccessTokenStrategy, RefreshTokenStrategy],
  exports: [AuthService]
})
export class AuthModule {}
