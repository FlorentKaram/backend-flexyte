import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from "@nestjs/jwt";
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { RestaurantModule } from 'src/restaurant/restaurant.module';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule,
    JwtModule,
    RestaurantModule
  ],
  providers: [AuthService,AccessTokenStrategy, RefreshTokenStrategy],
  exports: [AuthService]
})
export class AuthModule {}
