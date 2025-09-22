import { productsApi } from "@/core/api/productsApi";
import { Product } from "../interface/product.interface";

export const getProductById = async (id:string):Promise<Product> => {


    try {

        const { data } = await productsApi.get<Product>(`/products/${ id }`);

        return data;


    } catch (error) {

        throw new Error('Unable to load product');


    }


}