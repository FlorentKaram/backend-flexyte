import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "src/guards/access-token.guard";
import { TemplatesService } from "./templates.service";
import { TemplateDto } from "./dto/template.dto";
import { FilterTemplatesDto } from "./dto/filterRestaurants.dto";


@ApiTags('Template')
@Controller('template')
export class TemplatesController {
    constructor(private readonly templatesService: TemplatesService) { }

    // Update a template
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Patch template data' })
    @Patch()
    async updateTemplate(@Request() req, @Body() template: TemplateDto) {
        return this.templatesService.updateTemplate(req.user.companyName, template);
    }

    // Get template
    @ApiOperation({ summary: 'Get template data' })
    @Get(':companyName')
    async getTemplate(@Param('companyName') companyName: string) {
        return this.templatesService.getTemplate(companyName);
    }

    // Get template
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Get template data' })
    @Get()
    async getTemplateForRestaurant(@Request() req) {
        return this.templatesService.getTemplate(req.user.companyName);
    }

    // route to get all restaurants
    @ApiOperation({ summary: 'Get all restaurants' })
    @Post('all')
    async findAllrestaurants(@Body() filter: FilterTemplatesDto) {
        return this.templatesService.getAllTemplates(filter);
    }
}