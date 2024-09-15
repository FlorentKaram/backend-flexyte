import { TeamDataGateway } from "../interface/team.interface";
import { TeamService } from "../team.service";
import { Test, TestingModule } from "@nestjs/testing";
import { TeamMock } from "./team.mock";

describe("TeamService", () => {
    let service: TeamService;
    let teamDataGateway: TeamDataGateway;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TeamService,
                {
                    provide: TeamDataGateway,
                    useValue: {
                        createTeam: jest.fn(),
                        getAllTeam: jest.fn(),
                        updateTeam: jest.fn(),
                        deleteTeam: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<TeamService>(TeamService);
        teamDataGateway = module.get<TeamDataGateway>(TeamDataGateway);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    describe("createTeam", () => {
        it("should create a team", async () => {
            (teamDataGateway.createTeam as jest.Mock).mockResolvedValue({});
            expect(await service.createTeam("companyName", TeamMock.mockedTeam)).toEqual({});
        });
    });
    describe("getAllTeam", () => { 
        it("should return all teams", async () => {
            (teamDataGateway.getAllTeam as jest.Mock).mockResolvedValue([TeamMock.mockedTeam, TeamMock.mockedTeam]);
            expect(await service.getAllTeam("companyName")).toEqual([TeamMock.mockedTeam, TeamMock.mockedTeam]);
        });
    });
    describe("updateTeam", () => {
        it("should update a team", async () => {
            (teamDataGateway.updateTeam as jest.Mock).mockResolvedValue({});
            expect(await service.updateTeam("companyName", TeamMock.mockedTeam)).toEqual({});
        });
    });
    describe("deleteTeam", () => {
        it("should delete a team", async () => {
            (teamDataGateway.deleteTeam as jest.Mock).mockResolvedValue({});
            expect(await service.deleteTeam("companyName")).toEqual({});
        });
    });
});