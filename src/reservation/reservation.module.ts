import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ReservationController } from "./reservation.controller";
import { Reservation, ReservationSchema } from "./reservation.model";
import { ReservationService } from "./reservation.service";


@Module({
    imports: [MongooseModule.forFeature([{ name: "reservation", schema: ReservationSchema }])],
    providers: [ReservationService],
    controllers: [ReservationController]
})
export class ReservationModule {}