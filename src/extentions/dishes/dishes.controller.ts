import { Body, Controller, Delete, Get, Param, Request, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "src/guards/access-token.guard";
import { Dishe } from "./dishes.model";
import { DisheService } from "./dishes.service";
import { DisheDto } from "./dto/dishes.dto";

@ApiTags('Dishe')
@Controller('dishe')
export class DisheController{
    constructor(private readonly disheService: DisheService){}

    @ApiOperation({ summary: 'Get dishe by his id' })
    @Get(':id')
    async getOne(@Param('id') id: string,){
        return this.disheService.getOne(id);
    }

    @ApiOperation({ summary: 'Get all dishe of a restaurant' })
    @Get('user/:userEmail')
    async getAll(@Param('userEmail') emailRestautant: string){
        return this.disheService.getAll(emailRestautant);
    }

    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Create new dishe' })
    @Post()
    async create(@Request() req, @Body() dishe: DisheDto){
        return this.disheService.create(req.user.email ,dishe);
    }

    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Update dishe by is id'})
    @Patch(':id')
    async update(@Request() req, @Param('id') id: string, @Body() dishe: DisheDto){
        return this.disheService.update(req.user.email, id, dishe);
    }


    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Delete dishe by his id' })
    @Delete(':id')
    async delete(@Request() req, @Param('id') id: string){
        return this.disheService.delete(req.user.email, id);
    }
}