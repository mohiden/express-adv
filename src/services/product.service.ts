import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { IProduct, Product } from "../models";

export async function createProduct(input: DocumentDefinition<Omit<IProduct,"createdAt"|"updatedAt">>){
    return Product.create(input);
}
export async function findProduct(query: FilterQuery<IProduct>, options:QueryOptions = {lean: true}){
    return Product.findOne(query,{}, options);
}
export async function updateProduct(query: FilterQuery<IProduct>, update: UpdateQuery<IProduct>,options?:QueryOptions){
    return Product.findOneAndUpdate(query,update, options);
}
export async function deleteProduct(query: FilterQuery<IProduct>){
    return Product.findOneAndDelete(query);
}