import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "src/guards/access-token.guard";
import { Dishe } from "./dishe.model";
import { DisheService } from "./dishe.service";

@ApiTags('Dishe API')
@Controller('dishe')
export class DisheController{
    constructor(private readonly disheService: DisheService){}

    @ApiOperation({ summary: 'Get dishe by his id' })
    @Get(':id')
    async getOne(id: string){
        return this.disheService.getOne(id);
    }

    @ApiOperation({ summary: 'Get all dishe' })
    @Get()
    async getAll(){
        return this.disheService.getAll();
    }

    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Create new dishe' })
    @Post()
    async create(@Body() dishe: Dishe){
        return this.disheService.create(dishe);
    }

    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Update dishe by is id' })
    @Patch(':id')
    async update(id: string, @Body() dishe: Dishe){
        return this.disheService.update(id, dishe);
    }

    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Delete dishe by his id' })
    @Delete(':id')
    async delete(id: string){
        return this.disheService.delete(id);
    }
}