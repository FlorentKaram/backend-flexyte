import { ReservationService } from "../reservation.service";
import { ReservationDataGateway } from "../interface/reservation.interface";
import { Test, TestingModule } from "@nestjs/testing";
import { ReservationMock } from "./reservation.mock";

describe("DishService", () => {
    let service: ReservationService;
    let reservationDataGateway: ReservationDataGateway;
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            ReservationService,
            {
                provide: ReservationDataGateway,
                useValue: {
                    createReservation: jest.fn(),
                    findReservationWithEmail: jest.fn(),
                    validateReservation: jest.fn(),
                    getAllReservations: jest.fn(),
                    getAllReservationBydate: jest.fn(),
                    deleteReservation: jest.fn(),
                },
            },
        ],
        }).compile();
    
        service = module.get<ReservationService>(ReservationService);
        reservationDataGateway = module.get<ReservationDataGateway>(ReservationDataGateway);
    });
    
    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    describe("create", () => {
        it("should create a reservation", async () => {
            (reservationDataGateway.createReservation as jest.Mock).mockResolvedValue(ReservationMock.mockedReservationDto);
            expect(await service.createReservation(ReservationMock.mockedReservationDto)).toBe(ReservationMock.mockedReservationDto);
        });
        it("should throw an error if reservation already exists", async () => {
            (reservationDataGateway.findReservationWithEmail as jest.Mock).mockResolvedValue(ReservationMock.mockedReservationDto);
            await expect(service.createReservation(ReservationMock.mockedReservationDto)).rejects.toThrow("Reservation already exists");
        });
    });

    describe("getAllReservations", () => {
        it("should return all reservations", async () => {
            (reservationDataGateway.getAllReservations as jest.Mock).mockResolvedValue([ReservationMock.mockedReservationDto]);
            expect(await service.getAllReservations("companyName")).toEqual([ReservationMock.mockedReservationDto]);
        });
    });

    describe("validateReservation", () => {
        it("should validate a reservation", async () => {
            (reservationDataGateway.validateReservation as jest.Mock).mockResolvedValue(ReservationMock.mockedReservationDto);
            expect(await service.validateReservation("companyName", "email")).toEqual(ReservationMock.mockedReservationDto);
        });
    });

    describe("getAllReservationBydate", () => {
        it("should return all reservations by date", async () => {
            (reservationDataGateway.getAllReservationBydate as jest.Mock).mockResolvedValue([ReservationMock.mockedReservationDto]);
            expect(await service.getAllReservationBydate("companyName", "date")).toEqual([ReservationMock.mockedReservationDto]);
        });
    });

    describe("deleteReservation", () => {
        it("should delete a reservation", async () => {
            (reservationDataGateway.deleteReservation as jest.Mock).mockResolvedValue({});
            expect(await service.deleteReservation("companyName", "email")).toEqual({});
        });
    });
    
});