import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Price{
    @Prop({unique:true})
    tagNum:string;

    @Prop()
    MRPforTag:number;

    @Prop()
    Taxes:number;
}

export const PriceSchema = SchemaFactory.createForClass(Price);

export type PriceDocument = Price & Document;

export const PRICE_MODEL = Price.name;


