import { updateCreateProduct } from "@/core/products/actions/create-update-product.action";
import { Product } from "@/core/products/interface/product.interface";
import { useCameraStore } from "@/presentation/store/useCameraStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Alert } from "react-native";
import { getProductById } from "./../../../core/products/actions/get-product-by-id.action";

export const useProduct = (productId: string) => {

  const { clearImages } = useCameraStore();

  const queryClient = useQueryClient();
  const productIdRef = useRef(productId); //new UUID

  const productQuery = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProductById(productId),
    staleTime: 1000 * 60 * 60,
  });

  //Mutacion

  const productMutation = useMutation({
    mutationFn: async (data: Product) => updateCreateProduct({...data,
        id:productIdRef.current
    }),

    onSuccess(data: Product) {
     
      productIdRef.current = data.id; // esto es para los id que son "new"

      clearImages();

       //Invalidar products queries
      queryClient.invalidateQueries({ queryKey: ["products", "infinite"] });

      queryClient.invalidateQueries({ queryKey: ["products", data.id] });

      Alert.alert("Producto Guardado", `${data.title} se guardo correctamente`);
    },
  });

  //

  return {
    productQuery,
    productMutation,
  };
};
