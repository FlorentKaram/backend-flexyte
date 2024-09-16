import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type TeamDocument = Team & Document;

@Schema()
export class Team {
    @Prop({ required: true })
    companyName: string;

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    image: string;

    _id: string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);