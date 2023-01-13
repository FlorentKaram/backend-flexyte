import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";


export type DisheDocument = Dishe & Document;

@Schema()
export class Dishe{

    @ApiProperty()
    @Prop({required: true})
    name: string;

    @ApiProperty()
    @Prop({required: true})
    available: boolean;

    @ApiProperty()
    @Prop({required: true})
    description: string;

    @ApiProperty()
    @Prop({default: Date.now})
    createdAt: Date;

    @ApiProperty()
    @Prop({required: true})
    price: number;

    @ApiProperty()
    @Prop()
    image: string;

    @ApiProperty()
    @Prop()
    category: string;

    @ApiProperty()
    @Prop()
    ingredients: string[];

    @ApiProperty()
    @Prop()
    allergens: string[];

    @ApiProperty()
    @Prop()
    isAvailable: boolean;

    @ApiProperty()
    @Prop()
    isVegan: boolean;

    @ApiProperty()
    @Prop()
    isVegetarian: boolean;

    @ApiProperty()
    @Prop()
    isGlutenFree: boolean;

    @ApiProperty()
    @Prop()
    isSpicy: boolean;

}

export const DisheSchema = SchemaFactory.createForClass(Dishe);