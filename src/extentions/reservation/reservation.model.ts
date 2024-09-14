import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ReservationDocument = Reservation & Document;

export enum Status {
    ACCEPTED = 'accepted',
    DECLINED = 'declined',
    PENDING = 'pending',
}

@Schema()
export class Reservation {

    @Prop({required: true})
    companyName: string;

    @Prop({enum: Status, default: Status.PENDING})
    status: string;

    @Prop({required: true})
    date: string;

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