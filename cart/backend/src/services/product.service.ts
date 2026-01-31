import Product from "../models/product.model";
import  IProduct  from "../interfaces/product.interface";

import { Types } from "mongoose";

export class ProductService {
  async createProduct(data: IProduct): Promise<IProduct | null> {
    return null
    // return Product.create({
    //   title: data.title,
    //   email:data.email,
    //   description: data.description,
    //   author: data.author,
    //   published: data.published,
    //   skills:data.skills
    // });
  }

  async getProduct(): Promise<IProduct[]> {
    return Product.find();
  }  
}
// singleton export
export const productService = new ProductService();