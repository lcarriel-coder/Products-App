import { Product } from '@/core/products/interface/product.interface';
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert } from 'react-native';
import { getProductById } from './../../../core/products/actions/get-product-by-id.action';


export const useProduct = (productId:string) => {
  
    const productQuery = useQuery({
        queryKey:['products', productId],
        queryFn: () => getProductById(productId),
        staleTime : 1000*60*60
    });

    //Mutacion

    const productMutation = useMutation({
        mutationFn : async (data : Product) => {
            console.log({data});
            
            return data;
        },
        onSuccess(data:Product){
            //Invalidar products queries


            Alert.alert('Producto Guardado',`${ data.title } se guardo correctamente`);

        }
    });


    //


    return {

        productQuery,
        productMutation

    }



}
