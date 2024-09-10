import { Body, Controller, Delete, Get, Param, Request, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "src/guards/access-token.guard";
import { DishService } from "./dishes.service";
import { DishDto } from "./dto/dish.dto";

@ApiTags('Dish')
@Controller('dish')
export class DishController{
    constructor(private readonly dishService: DishService){}

    @ApiOperation({ summary: 'Get dish by his id' })
    @Get(':id')
    async getOne(@Param('id') id: string){
        return this.dishService.getOne(id);
    }

    @ApiOperation({ summary: 'Get all dish of a restaurant' })
    @Get('restaurant/:companyName')
    async getAll(@Param('companyName') companyName: string){
        return this.dishService.getAll(companyName);
    }

    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Create new dish' })
    @Post()
    async create(@Request() req, @Body() dish: DishDto){
        return this.dishService.create(req.user.companyName ,dish);
    }

    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Update dish by is id'})
    @Patch(':id')
    async update(@Request() req, @Param('id') id: string, @Body() dish: DishDto){
        return this.dishService.update(req.user.companyName, id, dish);
    }


    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Delete dish by his id' })
    @Delete(':id')
    async delete(@Request() req, @Param('id') id: string){
        return this.dishService.delete(req.user.email, id);
    }

    
}