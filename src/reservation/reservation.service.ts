import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Reservation, ReservationDocument, State } from "./reservation.model";


@Injectable()
export class ReservationService {
    constructor(@InjectModel('reservation') private readonly reservationModel: Model<ReservationDocument>) { }

    async reserve(reservation: Reservation) {
        let check = await this.reservationModel.findOne({ email: reservation.email });
        if (check && check.date >= this.getDailyDate()) {
            return {
                message: "You already have a reservation",
                status: 400,
                reservation: check
            }
        }
        else {
            let newReservation = new this.reservationModel(reservation);
            newReservation.state = State.PENDING;
            return newReservation.save();
        }
    }

    async reservationValid(email: string) {
        const reservation = await this.reservationModel.findOne({ email: email });
        if (!reservation) {
            return {
                message: "Reservation not found",
                status: 404
            }
        }
        reservation.state = State.VALID;
        //send email
        return reservation.save();
    }
    async reservationInvalid(email: string) {
        const reservation = await this.reservationModel.findOne({ email: email });
        if (!reservation) {
            return {
                message: "Reservation not found",
                status: 404
            }
        }
        reservation.state = State.INVALID;
        //send email
        return reservation.save();
    }

    async deleteReservation(email: string) {
        const deleted = await this.reservationModel.deleteOne({ email: email });
        if (deleted.deletedCount == 0) {
            return {
                message: "Reservation not found",
                status: 404
            }
        }
        return {
            message: "Reservation deleted",
            status: 200
        }
    }

    async getAllReservations() {
        return this.reservationModel.find();
    }

    async getByYear(year: number) {
        let date = new Date(year, 0, 0, 0, 0, 0, 0);
        return this.reservationModel.find(
            {
                date:
                {
                    $gte: date,
                }
            });
    }
    async getByMonth(year: number, month: number) {
        let date = new Date(year, month, 0, 0, 0, 0, 0);
        return this.reservationModel.find(
            {
                date:
                {
                    $gte: date,
                }
            });
    }
    async getByDay(year: number, month: number, day: number) {
        console.log(year + '-'+ month + '-'+ day );
        
        let date = new Date(`${year}-${month}-${day}Z`);
        console.log(date);
        
        return this.reservationModel.find(
            {
                date:
                {
                    $gte: date,
                }
            });
    }

    async getTodayReservations() {
        let date = this.getDailyDate();
        return this.reservationModel.find(
            {
                date:
                {
                    $gte: date,
                }
            });
    }

    getDailyDate() {
        let date = new Date();
        date.setHours(0, 0, 0, 0);
        return date;
    }
}
