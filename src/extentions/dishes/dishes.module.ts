import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DisheController } from "./dishes.controller";
import { DisheSchema } from "./dishes.model";
import { DisheService } from "./dishes.service";



@Module({
    imports: [MongooseModule.forFeature([{ name : "dishe" , schema: DisheSchema }])],
    controllers: [DisheController],
    providers: [DisheService]
})
export class DisheModule{

}