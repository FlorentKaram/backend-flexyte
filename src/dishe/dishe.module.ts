import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DisheSchema } from "./dishe.model";



@Module({
    imports: [MongooseModule.forFeature([{ name : "dishe" , schema: DisheSchema }])],
    controllers: [],
    providers: []
})
export class DisheModule{

}