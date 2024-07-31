import { Controller, Delete, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AdminGuard } from "src/guards/admin.guard";
import { RestaurantService } from "../services/restaurant.service";
import { TemplatesService } from "src/extentions/templates/templates.service";

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly restaurantsService: RestaurantService, private readonly templateService: TemplatesService) { }


    // admin route to lock/unlock a restaurant
    @UseGuards(AdminGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Lock/unlock restaurant' })
    @Patch(':companyName')
    lock(@Param("companyName") companyName: string) {
        return this.templateService.lockTemplate(companyName);
    }

    // admin route to delete a restaurant
    @UseGuards(AdminGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Delete restaurant' })
    @Delete(':companyName')
    remove(@Param("companyName") companyName: string) {
        return this.restaurantsService.remove(companyName);
    }
}