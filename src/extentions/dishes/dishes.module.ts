import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DisheController } from "./dishes.controller";
import { DisheSchema } from "./dishes.model";
import { DisheService } from "./dishes.service";
import { DishesDataGateway } from "./interface/dishes.interface";
import { MongooseDishes } from "./services/mongoose-dishes.service";



@Module({
    imports: [
        MongooseModule.forFeature([{ name : "dishes" , schema: DisheSchema }])
    ],
    controllers: [DisheController],
    providers: [DisheService, {provide: DishesDataGateway, useClass: MongooseDishes}]
})
export class DisheModule{

}