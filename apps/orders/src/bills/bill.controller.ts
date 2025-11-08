import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BillsService } from './bill.service';
import { CreateBillDto } from '../dto/bill.dto';
import { ClientProxy } from '@nestjs/microservices';
import { BILL_SERVICE } from './constants/services';

@Controller('bills')
export class BillsController {
  constructor(
    private readonly billsService: BillsService,
    ///here the emit function is in the controller should it be in the services
    @Inject(BILL_SERVICE) private readonly client: ClientProxy,
  ) {}


  //post request for bills
  @Post('/generateBill')
  // @eve
  async create(@Body() createBillDto: CreateBillDto) {
    const generatedBill = this.billsService.createBill(createBillDto);
    this.client.emit('Billissued', (await generatedBill).billnumber);
    return generatedBill;
  }

  @Get('/allBills')
  findAll() {
    return this.billsService.findAllBills();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billsService.findOneBill(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billsService.deleteBill(id);
  }
//get the bill by ID
  @Post('/getBillById')
  async  getBillById(
    @Body('billnumber') billnumber: string
  ){
    return this.billsService.getBillById(billnumber)}
}
