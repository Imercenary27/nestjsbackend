import {
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { BILL_MODEL, BillDocument } from '../schemas/bills/bill.schema';
import { Model } from 'mongoose';

import { CreateBillDto } from '../dto/bill.dto';
import { PRICE_MODEL, PriceDocument } from '../schemas/bills/price.schema';

import { ClientProxy } from '@nestjs/microservices';
import { BILL_SERVICE } from './constants/services';
@Injectable()
export class BillsService {
  constructor(
  
    @InjectModel(BILL_MODEL) private readonly billModel: Model<BillDocument>,

    @InjectModel(PRICE_MODEL) private readonly priceModel: Model<PriceDocument>,
  ) {}

  findByUsername(billnumber: string) {
    return this.billModel.findOne({ billnumber }).exec();
  }

  findTagNum(tagNum:string) {
    return this.priceModel.findOne({tagNum}).exec();
  }

  deleteBill(id: string) {
    throw new Error('Method not implemented.');
  }
  updateBill(id: string, updateOrderDto: any) {
    throw new Error('Method not implemented.');
  }
  findOneBill(id: string) {
    throw new Error('Method not implemented.');
  }
  async findAllBills() {
    const bills = await this.billModel.find();
    //const filterBill = bills.filter((bill) => bill.billnumber === 'Bill20230404T071555160Z');

    //Logger.log(filterBill);
    //Logger.log("billnumber", filterBill[0].billnumber);

    //const billllll = this.findByUsername('Bill20230404T071555160Z');
    //Logger.log((await billllll).tagNum[0]);

    //const price = this.findTagNum('tag01');
    //aLogger.log((await price).MRPforTag);


    return bills;
  }

  async priceCalculation(createBillDto:CreateBillDto){
    const tagNumberArray = createBillDto.tagNum;
       console.log(  tagNumberArray);
       var totalTagNumPrice = 0;
       var totalTaxes = 0;

       for(let i=0; i<tagNumberArray.length;i++){
        console.log(tagNumberArray[i]);
        const priceek = this.findTagNum(tagNumberArray[i]);
        totalTagNumPrice=totalTagNumPrice+(await priceek).MRPforTag;
        totalTaxes=totalTaxes+(await priceek).Taxes;
       }
       console.log(totalTagNumPrice);
       console.log(totalTaxes);
       return {totalTagNumPrice,totalTaxes};
  }

  async createBill(createBillDto: CreateBillDto) {
    let today: Date = new Date();

   // const billllll = this.findByUsername('04');
   // Logger.log((await billllll).tagNum);

    this.priceCalculation(createBillDto);
    // const order = await this.orderService.findOneOrder(createBillDto.orderId);

    /* Logger.log(order._id);
        if (!order) {
            throw new NotFoundException("Order not found");
        }
        */

       

       
      

    const bill = await this.billModel.create({
      // orderId: order._id,
      orderId: createBillDto.orderId,
      orderNumber: createBillDto.orderNumber,
      billnumber: 'Bill' + today.toISOString().replace("-","").replace("-","").replace(":","").replace(":","").replace(".",""),
      BillDate: today,
      tagNum: createBillDto.tagNum,
      OrderPrice: (await this.priceCalculation(createBillDto)).totalTagNumPrice,
      Taxes: (await this.priceCalculation(createBillDto)).totalTaxes,
      TotalBillPrice: (await this.priceCalculation(createBillDto)).totalTagNumPrice + (await this.priceCalculation(createBillDto)).totalTaxes, //CALCULATION should be done before
      PrintedOn: today,
      Remark: createBillDto.Remark,
      createdBy: createBillDto.createdBy,
      createdOn: today,
      buyer:createBillDto.buyer,
      buyerName: createBillDto.buyerName,
      sellerName: createBillDto.sellerName,
      mobileNumber: createBillDto.mobileNumber,
      isRetailsale:createBillDto.isRetailsale,
      address:createBillDto.address,
      updatedBy:createBillDto.updatedBy,
      updatedOn:today
    });
    return bill;
  }
  async getBillById(billnumber:string): Promise <any>{
    return this.billModel.findOne({billnumber})
    }
}
