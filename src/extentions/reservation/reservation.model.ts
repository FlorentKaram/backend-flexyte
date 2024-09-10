import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class Reservation {

    @Prop({required: true, unique: true})
    companyName: string;

    @Prop({required: true})
    date: Date;

    @Prop({required: true})
    reservationPhone: string;

    @Prop({required: true})
    numberOfPeople: number;

    @Prop({required: true})
    email: string;

    @Prop()
    message: string;
}