import { Body, Controller, Delete, Get, Param, Request, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "src/guards/access-token.guard";
import { DishService } from "./dishes.service";
import { DishDto } from "./dto/dish.dto";

@ApiTags('Dish')
@Controller('dish')
export class DishController{
    constructor(private readonly dishService: DishService){}

    @ApiOperation({ summary: 'Get dishe by his id' })
    @Get(':id')
    async getOne(@Param('id') id: string,){
        return this.dishService.getOne(id);
    }

    @ApiOperation({ summary: 'Get all dishe of a restaurant' })
    @Get('user/:userEmail')
    async getAll(@Param('userEmail') emailRestautant: string){
        return this.dishService.getAll(emailRestautant);
    }

    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Create new dishe' })
    @Post()
    async create(@Request() req, @Body() dish: DishDto){
        return this.dishService.create(req.user.email ,dish);
    }

    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Update dishe by is id'})
    @Patch(':id')
    async update(@Request() req, @Param('id') id: string, @Body() dishe: DishDto){
        return this.dishService.update(req.user.email, id, dishe);
    }


    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Delete dishe by his id' })
    @Delete(':id')
    async delete(@Request() req, @Param('id') id: string){
        return this.dishService.delete(req.user.email, id);
    }
}