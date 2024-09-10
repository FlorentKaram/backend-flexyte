import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export type DishDocument = Dish & Document;

@Schema()
export class Dish{
    
    @Prop({required: true})
    companyName: string;

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    available: boolean;
    
    @Prop({required: true})
    description: string;
    
    @Prop({default: Date.now})
    createdAt: Date;
    
    @Prop()
    price: number;

    @Prop()
    image: string;
    
    @Prop()
    category: string;
    
    @Prop()
    ingredients: string[];

    @Prop()
    allergens: string[];
    
    @Prop()
    isAvailable: boolean;
    
    @Prop()
    isVegan: boolean;
    
    @Prop()
    isVegetarian: boolean;
    
    @Prop()
    isGlutenFree: boolean;
    
    @Prop()
    isSpicy: boolean;

}

export const DishSchema = SchemaFactory.createForClass(Dish);