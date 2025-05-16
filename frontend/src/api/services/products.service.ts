import { Product } from "@/types/products";
import http from "./http-common";

class ProductService {
  async getAll(): Promise<Product[]> {
    // TODO: Implement pagination
    const response = await http.get("/products");
    return response.data;
  }

  async getById(id: number): Promise<Product> {
    const response = await http.get(`/products/${id}`);
    return response.data;
  }

  async create(product: Partial<Product>): Promise<Product> {
    const response = await http.post("/products", product);
    return response.data;
  }

  async update(id: number, product: Partial<Product>): Promise<Product> {
    const response = await http.patch(`/products/${id}`, product);
    return response.data;
  }

  async delete(id: number) {
    await http.delete(`/products/${id}`);
  }
}

export default new ProductService();
