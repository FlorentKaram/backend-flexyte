import { Injectable } from "@nestjs/common";
import { TeamDto } from "./dto/team.dto";
import { TeamDataGateway } from "./interface/team.interface";
import { Team } from "./team.model";

@Injectable()
export class TeamService {
    constructor(private readonly teamDataGateway: TeamDataGateway) { }
    
    async createTeam(companyName: string, teamDto: TeamDto): Promise<Team> {
        return this.teamDataGateway.createTeam(companyName, teamDto);
    }

    async getAllTeam(companyName: string): Promise<Team[]> {
        return this.teamDataGateway.getAllTeam(companyName);
    }

    async updateTeam(companyName: string, id: string, teamDto: TeamDto): Promise<Team> {
        return this.teamDataGateway.updateTeam(companyName, id, teamDto);
    }

    async deleteTeam(companyName: string, id: string): Promise<any> {
        return this.teamDataGateway.deleteTeam(companyName, id);
    }
}