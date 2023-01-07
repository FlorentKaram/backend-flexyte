import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService implements OnModuleInit{

  constructor(private readonly userService: UsersService){}
  onModuleInit() {
      this.userService.createFirstUser();
  }
}
