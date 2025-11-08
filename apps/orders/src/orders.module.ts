import { DatabaseModule } from '@app/common/db.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BillsModule } from './bills/bill.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    DatabaseModule,
    BillsModule
    ],
})
export class OrderModule {}
