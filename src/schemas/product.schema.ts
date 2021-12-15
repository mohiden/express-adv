import {object, string, number, TypeOf} from 'zod';

const payload = {
    body:object({
        title: string({
            required_error:"Title is required"
        }),
        description: string().min(100, "Description should be min 100 chars"),
        price: number({
            required_error:"Price is required"
        }),
        image: string({
            required_error: "Image is required"
        })
    })
} 


const params = {
    params: object({
        productId: string({
            required_error:"ProductId is required"
        })
    })
}

export const createProductSchema = object({
    ...payload
});

export const updateProductSchema = object({
    ...payload,
    ...params
}); 

export const findProductSchema = object({
    ...params
}); 

export const deleteProductSchema = object({
    ...params
}); 


export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type FindProductInput = TypeOf<typeof findProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;