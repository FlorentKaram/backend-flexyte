import { TeamDto } from "../dto/team.dto";
import { Team } from "../team.model";

export abstract class TeamDataGateway {
    createTeam: (companyName: string, teamDto: TeamDto) => Promise<Team>;

    getAllTeam: (companyName: string) => Promise<Team[]>;

    updateTeam: (companyName: string, teamDto: TeamDto) => Promise<Team>;

    deleteTeam: (companyName: string) => Promise<any>;
}