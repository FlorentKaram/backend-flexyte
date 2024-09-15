import { TemplateDataGateway } from "../interface/templates.interface";
import { TemplatesService } from "../templates.service";
import { Test, TestingModule } from "@nestjs/testing";
import { TemplateMock } from "./template.mock";
import { FilterTemplateMock } from "./filterTemplate.mock";

describe("TeamService", () => {
    let service: TemplatesService;
    let teamDataGateway: TemplateDataGateway;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TemplatesService,
                {
                    provide: TemplateDataGateway,
                    useValue: {
                        createTemplate: jest.fn(),
                        findOneTemplate: jest.fn(),
                        updateTemplate: jest.fn(),
                        saveTemplate: jest.fn(),
                        deleteTemplate: jest.fn(),
                        countTemplates: jest.fn(),
                        getAllTemplates: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<TemplatesService>(TemplatesService);
        teamDataGateway = module.get<TemplateDataGateway>(TemplateDataGateway);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    describe("initRestaurantTemplate", () => {
        it("should create a template", async () => {
            (teamDataGateway.createTemplate as jest.Mock).mockResolvedValue({});
            expect(await service.initRestaurantTemplate("companyName")).toEqual({});
        });
    });

    describe("updateTemplate", () => {
        it("should update a template", async () => {
            (teamDataGateway.findOneTemplate as jest.Mock).mockResolvedValue(TemplateMock.mockedTemplate);
            (teamDataGateway.saveTemplate as jest.Mock).mockResolvedValue(TemplateMock.mockedTemplate);
            expect(await service.updateTemplate("companyName", TemplateMock.mockedTemplate)).toEqual(TemplateMock.mockedTemplate);
        });
        it("should throw an error if template not found", async () => {
            (teamDataGateway.findOneTemplate as jest.Mock).mockResolvedValue(null);
            await expect(service.updateTemplate("companyName", TemplateMock.mockedTemplate)).rejects.toThrow("An error occurred, try later");
        });
    });

    describe("lockTemplate", () => {
        it("should lock a template", async () => {
            (teamDataGateway.findOneTemplate as jest.Mock).mockResolvedValue(TemplateMock.mockedTemplate);
            (teamDataGateway.updateTemplate as jest.Mock).mockResolvedValue({});
            expect(await service.lockTemplate("companyName")).toEqual(true);
        });
        it("should throw an error if template not found", async () => {
            (teamDataGateway.findOneTemplate as jest.Mock).mockResolvedValue(null);
            await expect(service.lockTemplate("companyName")).rejects.toThrow("Not Found");
        });
    });

    describe("getTemplate", () => {
        it("should return a template", async () => {
            (teamDataGateway.findOneTemplate as jest.Mock).mockResolvedValue(TemplateMock.mockedTemplate);
            expect(await service.getTemplate("companyName")).toEqual(TemplateMock.mockedTemplate);
        });
        it("should throw an error if template not found", async () => {
            (teamDataGateway.findOneTemplate as jest.Mock).mockResolvedValue(null);
            await expect(service.getTemplate("companyName")).rejects.toThrow("Not Found");
        });
    });

    describe("getAllTemplates", () => {
        it("should return all templates", async () => {
            (teamDataGateway.getAllTemplates as jest.Mock).mockResolvedValue([TemplateMock.mockedTemplate, TemplateMock.mockedTemplate]);
            (teamDataGateway.countTemplates as jest.Mock).mockResolvedValue(2);
            expect(await service.getAllTemplates(FilterTemplateMock.mockedFilterTemplate)).toEqual({
                templates: [TemplateMock.mockedTemplate, TemplateMock.mockedTemplate],
                numberOfTemplates: 2,
                page: 1,
                perPage: 10
            });
        });
    });
});