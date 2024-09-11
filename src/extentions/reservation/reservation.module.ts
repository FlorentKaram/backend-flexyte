import { Module, Res } from "@nestjs/common";
import { ReservationController } from "./reservation.controller";
import { ReservationService } from "./reservation.service";
import { ReservationSchema } from "./reservation.model";
import { MongooseModule } from "@nestjs/mongoose";
import { MongooseReservation } from "./services/mongoose-reservation.service";
import { ReservationDataGateway } from "./interface/reservation.interface";

@Module({
    imports: [MongooseModule.forFeature([{ name : "reservations" , schema: ReservationSchema }])],
    providers: [
        ReservationService,
        { provide: ReservationDataGateway, useClass: MongooseReservation }
    ],
    controllers: [ReservationController],
    exports: []
})
export class ReservationModule {

}