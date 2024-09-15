import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AccessTokenGuard } from './guards/access-token.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @ApiOperation({ summary: 'Get data of all extention' })
  @Get('extentions')
  getExtentions() {
    return [
      {
        name : "Affichage & Modification de la carte",
        description : "Cette extention vous permet de gerer votre carte de restaurant. Vous pouvez ajouter des plats, modifier les prix, les descriptions et les images.",
        price : 5,
        content : [
          "Edition de la carte",
          "Modification de la carte",
          "Creation de plats"
        ]
      },
      {
        name : "Reservation",
        description : "Cette extention vous permet de gerer les reservations de votre restaurant. Vous pouvez definir les horraires et les jours d'ouverture. Vous pouvez aussi valider ou refuser les reservations.",
        price : 7,
        content : [
          "Reservation sur place",
          "Definition de mes horraires",
          "Definition de mes places"
        ]
      },
      {
        name : "Click and collect",
        description : "🔺 Toujours en cours de developpement 🔺",
        price : 20,
        content : [
          ""
        ]
      },
      {
        name : "Présentation de l'équipe",
        description : "Cette extention vous permet de presenter votre equipe. Vous pouvez ajouter des membres et modifier leurs informations.",
        price : 3,
        content : [
          "Un template par membre",
        ]
      }
    ]
  }
}
