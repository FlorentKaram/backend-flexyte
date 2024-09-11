import { reservationDto } from "../dto/reservation.dto";
import { Reservation } from "../reservation.model";

export abstract class ReservationDataGateway {
    createReservation: (companyName: string, reservationNumber: reservationDto) => Promise<void>;

    findReservationWithEmail: (companyName: string, email: string) => Promise<Reservation[]>;

    getAllReservations: (companyName: string) => Promise<Reservation[]>;

    deleteReservation: (companyName: string, email: string) => Promise<any>;
}