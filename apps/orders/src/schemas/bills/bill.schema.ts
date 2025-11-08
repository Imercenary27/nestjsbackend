import { AbstractDocument } from '@app/common/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { ORDER_MODEL, Order } from '../orders/order.schema';
import mongoose from 'mongoose';
import { Type } from 'class-transformer';
import { StyleRules } from '@material-ui/core';

@Schema()
export class Bills {
  //@Prop({ type: SchemaTypes.ObjectId, ref: ORDER_MODEL, required: true })
  //orderId: Types.ObjectId | Order;

  @Prop({ unique: true })
  orderId: string;
  
  @Prop({ unique: true })
  billnumber: string;

  @Prop()
  orderNumber: string;

  @Prop()
  BillDate: Date;

  @Prop()
  OrderPrice: number;

  @Prop()
  Taxes: number;

  @Prop()
  TotalBillPrice: number;

  @Prop()
  PrintedOn: Date;

  @Prop()
  Remark: string;

  @Prop()
  createdBy: string;

  @Prop()
  createdOn: Date;

  @Prop()
  tagNum: string[];

  @Prop()
  buyer:string;
  

  @Prop()
  buyerName: string;

  @Prop()
  sellerName: string;

  @Prop()
  mobileNumber: number;

 
  @Prop()
  isRetailsale:boolean;
  @Prop()
  address:string;

  @Prop()
  updatedBy:string;

  @Prop()
  updatedOn:Date;

}

export const BillSchema = SchemaFactory.createForClass(Bills);

export type BillDocument = Bills & Document;

export const BILL_MODEL = Bills.name;
