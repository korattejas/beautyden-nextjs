import api from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { decryptData } from "@/utils/encryption";

export interface ProductBrand {
  id: number;
  name: string;
  icon: string;
}

export interface ProductBrandsResponse {
  code: number;
  status: boolean;
  message: string;
  data: ProductBrand[];
}

export const getProductBrands = async (): Promise<ProductBrandsResponse> => {
  try {
    const response = await api.get(endpoints.PRODUCT_BRANDS);

    if (typeof response.data === "string" && response.data.includes(":")) {
      const decryptedData = decryptData(response.data);
      return decryptedData as ProductBrandsResponse;
    }

    return response.data as ProductBrandsResponse;
  } catch (error) {
    console.error("Error fetching product brands:", error);
    throw error;
  }
};


