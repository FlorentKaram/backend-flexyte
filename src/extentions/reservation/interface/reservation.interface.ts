import { ReservationDto } from "../dto/reservation.dto";
import { Reservation } from "../reservation.model";

export abstract class ReservationDataGateway {
    createReservation: (reservationNumber: ReservationDto) => Promise<Reservation>;

    findReservationWithEmail: (companyName: string, email: string) => Promise<Reservation>;

    validateReservation: (companyName: string, email: string) => Promise<Reservation>;

    getAllReservations: (companyName: string) => Promise<Reservation[]>;

    getAllReservationBydate: (companyName: string, date: string) => Promise<Reservation[]>;

    deleteReservation: (companyName: string, email: string) => Promise<any>;
}