import { Injectable } from "@nestjs/common";
import { TeamDataGateway } from "../interface/team.interface";
import { TeamDto } from "../dto/team.dto";
import { Team } from "../team.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


@Injectable()
export class MongooseTeamService implements TeamDataGateway{
    constructor(@InjectModel('teams') private readonly teamModel: Model<Team>) { }

    createTeam = async (companyName: string, teamDto: TeamDto) =>{
        return this.teamModel.create({companyName: companyName, name: teamDto.name, description: teamDto.description, image: teamDto.image});
    };

    getAllTeam = async (companyName: string) => {
        return this.teamModel.find({companyName: companyName});
    };

    updateTeam = async (companyName: string, teamDto: TeamDto) => {
        return this.teamModel.findOneAndUpdate({companyName: companyName}, teamDto);
    };

    deleteTeam = async (companyName: string) => {
        return this.teamModel.deleteOne({companyName
        : companyName});
    }
}