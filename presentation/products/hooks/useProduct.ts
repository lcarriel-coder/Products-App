import { useQuery } from "@tanstack/react-query";
import { getProductById } from './../../../core/products/actions/get-product-by-id.action';


export const useProduct = (productId:string) => {
  
    const productQuery = useQuery({
        queryKey:['products', productId],
        queryFn: () => getProductById(productId),
        staleTime : 1000*60*60
    });

    //Mutacion


    //


    return {

        productQuery

    }



}
