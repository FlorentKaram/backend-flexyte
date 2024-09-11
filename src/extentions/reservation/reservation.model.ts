import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {

    @Prop({required: true})
    companyName: string;

    @Prop({required: true})
    isValid: boolean;

    @Prop({required: true})
    date: Date;

    @Prop({required: true})
    reservationPhone: string;

    @Prop({required: true})
    numberOfPeople: number;

    @Prop({required: true, unique: true})
    email: string;

    @Prop()
    message: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);