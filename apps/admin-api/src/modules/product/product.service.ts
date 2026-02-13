import { Injectable } from '@nestjs/common'
import { prisma, Product } from '@sift-shop/database'

@Injectable()
export class ProductService {
  async getProducts(): Promise<Product[]> {
    const products = await prisma.product.findMany({})

    return products
  }
}
