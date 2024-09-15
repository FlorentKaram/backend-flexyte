import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TeamSchema } from "./team.model";
import { TeamController } from "./team.controller";
import { TeamService } from "./team.service";
import { MongooseTeamService } from "./services/mongoose-team.service";
import { TeamDataGateway } from "./interface/team.interface";

@Module({
    imports: [MongooseModule.forFeature([{ name : "teams" , schema: TeamSchema }])],
    providers: [TeamService, 
        { provide: TeamDataGateway, useClass: MongooseTeamService }],
    controllers: [TeamController],
    exports: []
})
export class TeamModule {
    
}