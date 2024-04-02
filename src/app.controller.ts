import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AccessTokenGuard } from './guards/access-token.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('acces-token')
  @ApiOperation({ summary: 'Get data of all extentions' })
  @Get('extentions')
  getExtentions() {
    return [
      {
        name : "Vitrine",
        description : "",
        price : 10,
        content : [""]
      },
      {
        name : "Affichage & Modification de la carte",
        description : "",
        price : 5,
        content : [""]
      },
      {
        name : "Reservation",
        description : "",
        price : 7,
        content : [""]
      },
      {
        name : "Click and collect",
        description : "",
        price : 20,
        content : [""]
      },
      {
        name : "Présentation de l'équipe",
        description : "",
        price : 3,
        content : [""]
      },
      {
        name : "Gestion des stocks",
        description : "",
        price : 1,
        content : [""]
      }
    ]
  }
}
