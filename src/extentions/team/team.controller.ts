import { Body, Controller, Patch, UseGuards, Request, Param, Get, Delete, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { TeamService } from "./team.service";
import { TeamDto } from "./dto/team.dto";
import { AccessTokenGuard } from "src/guards/access-token.guard";

@ApiTags('team')
@Controller('team')
export class TeamController {
    constructor(private teamService: TeamService) { }

        // Update a team
        @UseGuards(AccessTokenGuard)
        @ApiBearerAuth('acces-token')
        @ApiOperation({ summary: 'Patch team data' })
        @Patch(':id')
        async updateTeam(@Request() req, @Body() team: TeamDto, @Param('id') id: string) {
            return this.teamService.updateTeam(req.user.companyName, id, team);
        }

        // Get team
        @ApiOperation({ summary: 'Get team data' })
        @Get(':companyName')
        async getTeam(@Param('companyName') companyName: string) {
            return this.teamService.getAllTeam(companyName);
        }

        // Create a team
        @UseGuards(AccessTokenGuard)
        @ApiBearerAuth('acces-token')
        @ApiOperation({ summary: 'Create a team' })
        @Post()
        createTeam(@Request() req, @Body() team: TeamDto) {      
            return this.teamService.createTeam(req.user.companyName, team);
        }

        // Delete a team
        @UseGuards(AccessTokenGuard)
        @ApiBearerAuth('acces-token')
        @ApiOperation({ summary: 'Delete a team' })
        @Delete(':id')
        deleteTeam(@Request() req, @Param('id') id: string) {
            return this.teamService.deleteTeam(req.user.companyName, id);
        }
}