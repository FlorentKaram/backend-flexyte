import { Injectable } from "@nestjs/common";
import { ReservationDto } from "./dto/reservation.dto";
import { ReservationDataGateway } from "./interface/reservation.interface";

@Injectable()
export class ReservationService {
    constructor(private reservationDataGateway: ReservationDataGateway) { }

    async createReservation(reservation: ReservationDto) {
        let check = await this.reservationDataGateway.findReservationWithEmail(reservation.companyName, reservation.email);
        if(check){
            throw new Error("Reservation already exists");
        }
        reservation.isValid = false;
        return this.reservationDataGateway.createReservation(reservation);
    }
    
    async getAllReservations(companyName: string){
        return this.reservationDataGateway.getAllReservations(companyName);
    }

    async validateReservation(companyName: string, email: string){
        return this.reservationDataGateway.validateReservation(companyName, email);
    }

    async getAllReservationBydate(companyName: string, date: string){
        return this.reservationDataGateway.getAllReservationBydate(companyName, date);
    }

    async deleteReservation(companyName: string, email: string){
        return this.reservationDataGateway.deleteReservation(companyName, email);
    }
}