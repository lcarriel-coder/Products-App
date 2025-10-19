import { productsApi } from "@/core/api/productsApi";
import { Product } from "../interface/product.interface";

export const updateCreateProduct = (product: Partial<Product>) => {
  product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
  product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

  if (product.id && product.id !== "new") {
    return updateProduct(product);
  }

  return createProduct(product);
};

const prepareImages = async (images:string[]):Promise<string[]> =>{

  const filesImages = images.filter( (image) => image.includes('file'));
  const currentImages = images.filter( (image) => !image.includes('file'));


  if(filesImages.length > 0)
  {
    const uploadPromises = filesImages.map( uploadImage );
    const uploadImages = await Promise.all( uploadPromises );

    currentImages.push(...uploadImages);

  }


  return currentImages.map(img => img.split('/').pop()!);

}


const uploadImage = async (image: string): Promise<string> => {
  //const FormData = global.FormData;
  const formData = new FormData() as any;
  formData.append("file", {
    uri: image,
    type: "image/jpeg",
    name: image.split("/").pop(),
  });

  const { data } = await productsApi.post<{ image: string }>(
    "/files/product",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data.image;
};

const updateProduct = async (product: Partial<Product>) => {

  const { id, images = [], user, ...rest } = product;

  try {

    const checkImages = await prepareImages(images);

    const { data } = await productsApi.patch<Product>(`/products/${id}`, {
      ...rest,
      images:checkImages
    });

    return data;
  } catch (error) {
    throw new Error("Error al actualizar el producto");
  }
};


const createProduct = async (product: Partial<Product>) => {
  const { id, images = [], user, ...rest } = product;

  try {
    const { data } = await productsApi.post<Product>(`/products`, {
      ...rest,
    });

    return data;
  } catch (error) {
    throw new Error("Error al actualizar el producto");
  }
};
