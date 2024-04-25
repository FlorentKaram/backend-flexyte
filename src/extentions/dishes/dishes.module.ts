import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DishController } from "./dishes.controller";
import { DisheSchema } from "./dishes.model";
import { DishService } from "./dishes.service";
import { DishesDataGateway } from "./interface/dishes.interface";
import { MongooseDishes } from "./services/mongoose-dishes.service";



@Module({
    imports: [
        MongooseModule.forFeature([{ name : "dish" , schema: DishSchema }])
    ],
    controllers: [DishController],
    providers: [DishService, {provide: DishesDataGateway, useClass: MongooseDishes}]
})
export class DishModule{

}