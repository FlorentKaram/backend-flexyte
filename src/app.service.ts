import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users/services/users.service';
import { SirenApiService } from './users/services/siren.service';
import { SirenDataGateway } from './users/interface/siren.interface';

@Injectable()
export class AppService implements OnModuleInit {

  constructor(private readonly userService: UsersService, private sirenDataGateway: SirenDataGateway) { }
  onModuleInit() {
    this.sirenDataGateway.getToken();
    this.userService.createFirstUser();
  }
}
