import { NestFactory } from '@nestjs/core';
import { OrderModule } from './orders.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqService } from '@app/common/rmq/rmq.service';
import { BillsModule } from './bills/bill.module';

async function bootstrap() {
  const app = await NestFactory.create(BillsModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //   urls: ['amqp://user:password@localhost:5672/'],
  //   queue: 'bill_queue',
  //   queueOptions: {
  //     durable: false
  //   },
  // },

  // });
  const configService = app.get(ConfigService);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions(configService.get<string>('RABBIT_MQ_QUEUE')));
  await app.startAllMicroservices();

  //app.useGlobalPipes(new ValidationPipe({transform:true})); //validates using dto
  await app.listen(configService.get<string>('PORT'));
  console.log("Bills app listening on " + configService.get<string>('PORT'));
  
}
bootstrap();
