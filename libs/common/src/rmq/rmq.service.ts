import { ConfigService } from '@nestjs/config';
import { Injectable } from "@nestjs/common";
import { RmqOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';
import { RmqContext } from '@nestjs/microservices/ctx-host';

@Injectable()
export class RmqService
{
    constructor(private readonly configService: ConfigService) {}
    
    getOptions(queue: string, noAck :boolean = false): RmqOptions{
        
        return {
            transport: Transport.RMQ,
            options: {
                urls: [this.configService.get<string>('RABBIT_MQ_URI')],
                queue: this.configService.get<string>(`RABBIT_MQ_${queue}_QUEUE`),
                // noAck,
                
                persistent:true
            }, 
        };
    }

    // ack(context: RmqContext)
    // {
    //     const channel = context.getChannelRef();
    //     const originalMessage = context.getMessage();
    //     channel.ack(originalMessage);
    // }
}