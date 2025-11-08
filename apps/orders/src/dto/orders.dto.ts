import { IsString, IsNumber,IsMongoId,IsNotEmpty } from "class-validator";
import { Date } from 'mongoose';

export class OrderGenDto{

 
  orderNumber:string

  orderDate:Date;

  //@IsString()
  Seller:string;

  //@IsString()
  Buyer:string; //code

  tagNums:string[] ;

  //@IsString()
  BuyerName: string;

 // @IsNumber()
  OrderPrice: Number;

 // @IsString()
  Remark: string;

 // @IsString()
  createdBy: string;

  createdOn: Date;

  //@IsString()
  updateBy: string;

  updatedOn: Date;

}

