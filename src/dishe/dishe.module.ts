import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DisheController } from "./dishe.controller";
import { DisheSchema } from "./dishe.model";
import { DisheService } from "./dishe.service";



@Module({
    imports: [MongooseModule.forFeature([{ name : "dishe" , schema: DisheSchema }])],
    controllers: [DisheController],
    providers: [DisheService]
})
export class DisheModule{

}