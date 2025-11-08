import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { expression } from 'joi';


@Schema({})
export class Order
{
   
    @Prop({unique: true}) 
    orderNumber: string;

    @Prop()
    orderDate: Date;

    @Prop()
    Seller: string;

    @Prop()
    Buyer: string;
  
    @Prop()
    tagNums: string[]; //Sold Tag Numbers

    @Prop()
    BuyerName: string;

    @Prop()
    OrderPrice: Number;

    @Prop()
    Remark: string;

    @Prop()
    createdBy: string;

    @Prop()
    createdOn: Date;

    @Prop()
    updateBy: string;

    @Prop()
    updatedOn: Date;
    
}

export const OrderSchema = SchemaFactory.createForClass(Order);

export const ORDER_MODEL = Order.name;

export type OrderDocument = Order & Document;