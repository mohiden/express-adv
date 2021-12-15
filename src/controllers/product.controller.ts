import { Request, Response } from "express";
import { CreateProductInput, DeleteProductInput, FindProductInput, UpdateProductInput } from "src/schemas";
import { createProduct, findProduct, updateProduct, deleteProduct } from "../services";

export async function createProductHandler(req: Request<{}, {}, CreateProductInput['body']>, res: Response){
    try {
        const userId = res.locals.user._id;
        const product = await createProduct({...req.body, user: userId});
        return res.send(product);
    }catch(e) {
        return res.status(500).send(e.toString());
    }
}
export async function findProductHandler(req: Request<FindProductInput['params'], {}, {}>, res: Response){
    try {
        const productId = req.params.productId;
        const product = await findProduct({_id: productId});
        if(!product){
            return res.sendStatus(404);
        }
        return res.send(product);
    }catch(e) {
        return res.status(500).send(e.toString());
    }
}
export async function updateProductHandler(req: Request<UpdateProductInput['params'], {}, UpdateProductInput['body']>, res: Response){
    console.log("UPDATE SHIT")
    try {
        const userId = res.locals.user._id;
        const productId = req.params.productId;
        const update = req.body;
        const product = await findProduct({_id: productId});
        if(!product){
            return res.sendStatus(404);
        }
        if(product.user.toString() !== userId) {
            console.log("PS:", product.user);
            console.log("S:", userId);
            return res.sendStatus(403);
        }
        const updatedProduct = await updateProduct({_id: product._id}, update, {new: true});
        return res.send(updatedProduct)
    }catch(e) {
        return res.status(500).send(e.toString());

    }
}
export async function deleteProductHandler(req: Request<DeleteProductInput['params'], {}, {}>, res: Response){
    try {
        const userId = res.locals.user._id;
        const productId = req.params.productId;
        const product = await findProduct({_id: productId});
        if(!product){
            return res.sendStatus(404)
        }
        if(product.user.toString() !== userId) {
            return res.sendStatus(403);
        }
        await deleteProduct({_id: product._id});
        return res.send(true)
    }catch(e) {
        return res.status(500).send(e.toString());

    }
}