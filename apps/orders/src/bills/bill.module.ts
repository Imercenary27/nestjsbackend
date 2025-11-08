import { Module } from "@nestjs/common";

import { MongooseModule } from "@nestjs/mongoose";
import { BILL_MODEL, BillSchema } from "../schemas/bills/bill.schema";
import { BillsService } from "./bill.service";

import { BillsController } from "./bill.controller";
import { PRICE_MODEL, PriceSchema } from "../schemas/bills/price.schema";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigModule } from "@nestjs/config";
import { BILL_SERVICE } from "./constants/services";
import { configValidation } from "../schemas/config.schema";
import { RmqModule } from "@app/common";
import { OrderModule } from "../orders.module";



@Module({
    imports:[
      RmqModule,
      OrderModule,
      
      ConfigModule.forRoot({
      
        envFilePath:"./apps/orders/.env",
        
      }),
      MongooseModule.forFeature([{
        name:BILL_MODEL, 
        schema:BillSchema
      }]),
      MongooseModule.forFeature([{
        name:PRICE_MODEL, 
        schema:PriceSchema
      }]),
   
      RmqModule.register({
        name:BILL_SERVICE
      }),
    

],
    controllers: [BillsController],
    providers:[BillsService],
    exports:[BillsService],
})

export class BillsModule{}