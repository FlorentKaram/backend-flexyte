import { DishService } from "../dishes.service";
import { DishesDataGateway } from "../interface/dishes.interface";
import { Test, TestingModule } from "@nestjs/testing";
import { DishMock } from "./dishes.mock";

describe("DishService", () => {
    let service: DishService;
    let dishesDataGateway: DishesDataGateway;
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            DishService,
            {
                provide: DishesDataGateway,
                useValue: {
                    getAllDishes: jest.fn(),
                    getOneDish: jest.fn(),
                    createDish: jest.fn(),
                    findAndDeleteDish: jest.fn(),
                    deleteAllDish: jest.fn(),
                    saveDish: jest.fn(),
                },
            },
        ],
        }).compile();
    
        service = module.get<DishService>(DishService);
        dishesDataGateway = module.get<DishesDataGateway>(DishesDataGateway);
    });
    
    it("should be defined", () => {
        expect(service).toBeDefined();
    });
    
    describe("getOne", () => {
        it("should return a dish", async () => {
        (dishesDataGateway.getOneDish as jest.Mock).mockResolvedValue(DishMock.mockedDish);
        expect(await service.getOne("1")).toBe(DishMock.mockedDish);
        });

        it("should throw an error if dish not found", async () => {
        (dishesDataGateway.getOneDish as jest.Mock).mockResolvedValue(null);
        await expect(service.getOne("1")).rejects.toThrow("Dish not found");
        });
    });

    describe("create", () => {
        it("should create a dish", async () => {
            (dishesDataGateway.createDish as jest.Mock).mockResolvedValue(DishMock.mockedDish);
            expect(await service.create("companyName", DishMock.mockedDish)).toBe(DishMock.mockedDish);
        });
    });

    describe("update", () => {
        it("should update a dish", async () => {
            (dishesDataGateway.getOneDish as jest.Mock).mockResolvedValue(DishMock.mockedDish);
            (dishesDataGateway.saveDish as jest.Mock).mockResolvedValue(DishMock.mockedDish);
            expect(await service.update("companyName", "1", DishMock.mockedDish)).toBe(DishMock.mockedDish);
        });

        it("should throw an error if dish not found", async () => {
            (dishesDataGateway.getOneDish as jest.Mock).mockResolvedValue(null);
            await expect(service.update("companyName", "1", DishMock.mockedDish)).rejects.toThrow("Dish not found");
        });
    });

    describe("delete", () => {
        it("should delete a dish", async () => {
            (dishesDataGateway.getOneDish as jest.Mock).mockResolvedValue(DishMock.mockedDish);
            (dishesDataGateway.findAndDeleteDish as jest.Mock).mockResolvedValue(DishMock.mockedDish);
            expect(await service.delete("companyName", "1")).toBe(DishMock.mockedDish);
        });

        it("should throw an error if dish not found", async () => {
            (dishesDataGateway.getOneDish as jest.Mock).mockResolvedValue(null);
            await expect(service.delete("companyName", "1")).rejects.toThrow("Dish not found");
        });

        it("should throw an error if company name is different", async () => {
            (dishesDataGateway.getOneDish as jest.Mock).mockResolvedValue(DishMock.mockedDish);
            await expect(service.delete("otherCompanyName", "1")).rejects.toThrow("you cannot delete other restaurants dishes");
        });
    });
});