import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Date } from 'mongoose';

export class CreateBillDto {
  @IsNotEmpty()
  //@IsMongoId()
  orderId: string;

  orderNumber: string;

  billnumber: string;

 

  BillDate: Date;

  tagNum: string[];
 
  OrderPrice: number;

  Taxes: number;

  TotalBillPrice: number;

  PrintedOn: Date;

 // @IsString()
  Remark: string;

  //@IsString()
  createdBy: string;

  createdOn: Date;

  //@IsString()

  buyer:string;

  buyerName: string;

  sellerName: string;

  //@IsNumber()
  mobileNumber: number;

  isRetailsale:boolean;

  address:string;

  updatedBy:string;

  updatedOn:Date;





}
