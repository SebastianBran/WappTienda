import { Product } from "@/types/products";
import http from "./http-common";

class ProductService {
  async getAll(): Promise<Product[]> {
    // TODO: Implement pagination
    const response = await http.get("/products");
    return response.data;
  }
}

export default new ProductService();
