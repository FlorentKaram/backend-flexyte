import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DishController } from "./dishes.controller";
import { DishService } from "./dishes.service";
import { DishesDataGateway } from "./interface/dishes.interface";
import { MongooseDishes } from "./services/mongoose-dishes.service";
import { DishSchema } from "./dishes.model";



@Module({
    imports: [
        MongooseModule.forFeature([{ name : "dishes" , schema: DishSchema }])
    ],
    controllers: [DishController],
    providers: [DishService, {provide: DishesDataGateway, useClass: MongooseDishes}]
})
export class DishModule{

}