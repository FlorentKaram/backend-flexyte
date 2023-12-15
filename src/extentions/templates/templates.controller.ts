import { Body, Controller, Get, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "src/guards/access-token.guard";
import { TemplatesService } from "./templates.service";
import { TemplateDto } from "./dto/template.dto";


@ApiTags('Template')
@Controller('template')
export class TemplatesController {
    constructor(private readonly templatesService: TemplatesService) { }

    // Update a template
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Patch template data' })
    @Patch()
    async updateTemplate(@Request() req, @Body() template: TemplateDto){
        return this.templatesService.updateTemplate(req.user.email, template);
    }

    // Get template
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Get template data' })
    @Get()
    async getTemplate(@Request() req){
        return this.templatesService.getTemplate(req.user.email);
    }  


}