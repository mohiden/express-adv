import {customAlphabet} from 'nanoid';
import   {Document, model, Schema}  from 'mongoose';
import { IUser } from '.';

const nanoid = customAlphabet('abcdefjhijklmnopqrstuvwxyz01234567890',10);

export interface IProduct extends Document {
user: IUser["_id"]; 
productId?: string;
title: string;
description: string;
price: number;
image: string;
createdAt: Date;
updatedAt: Date;
}

const schema = new Schema<IProduct>({
    productId: {
        type: String,
        unique: true,
        required: true,
        default: () => `product_${nanoid()}`
    },
   user: {type: Schema.Types.ObjectId, ref:"User"},
   title: {type:String, required:true},
   description: {type:String, required:true},
   price: {type:Number, required:true},
   image: {type:String, required:true},

},{timestamps: true});



export const Product = model<IProduct>("Product", schema);  