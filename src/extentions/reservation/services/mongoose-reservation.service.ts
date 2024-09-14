import { Injectable } from "@nestjs/common";
import { ReservationDataGateway } from "../interface/reservation.interface";
import { InjectModel } from "@nestjs/mongoose";
import { ReservationDto } from "../dto/reservation.dto";
import { Reservation } from "../reservation.model";
import { Model } from "mongoose";

@Injectable()
export class MongooseReservation implements ReservationDataGateway{
    constructor(@InjectModel('reservations') private readonly reservationModel: Model<Reservation>) {}

    createReservation = async (reservation: ReservationDto) => {
        return this.reservationModel.create(reservation);
    };

    validateReservation = async (companyName: string, email: string) =>{
        let reservation = await this.reservationModel.findOne({companyName: companyName, email: email});
        if(!reservation){
            throw new Error("Reservation not found");
        }
        reservation.status = "accepted";
        await reservation.save();
        return reservation;
    };

    findReservationWithEmail = async (companyName: string, email: string) => {
        return this.reservationModel.findOne({companyName: companyName, email: email});
    };

    getAllReservations = async (companyName: string) => {
        return this.reservationModel.find({companyName: companyName});
    };

    getAllReservationBydate = async (companyName: string, date: string) => {
        return this.reservationModel.find({companyName: companyName, date: date});
    }

    deleteReservation = async(companyName: string, email: string) => {
        return this.reservationModel.deleteOne({companyName: companyName, email: email});
    };
}
